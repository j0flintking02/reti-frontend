import { Card, Calendar, Avatar, Tag } from "antd";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import CustomDashboardLayout from "../../../components/secondary/CustomDashboardPagesLayout";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "../../../services/notifications";
import { loginDetails } from "../../../utils";
import { InspirationsType } from "../../../services/types";
import { useGetInspirationsQuery } from "../../../services/inspirations";
import Loader from "../../loader";
import { useGetUserProfileQuery } from "../../../services/profiles";
import Chat from "../../../components/secondary/Chat";
import { toast } from "react-toastify";
import MentorshipCalendar from "../../../components/secondary/Calendar";

const YouthDashboardPage = () => {
  const { data: notificationsData, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const user = loginDetails();
  const { data: inspirationsData } = useGetInspirationsQuery();
  const { data: userProfile } = useGetUserProfileQuery(user?.user?.id);
  const [inspirations, setInspirations] = useState<InspirationsType[]>([]);

  const handleNotificationClick = async (notificationId: number) => {
    try {
      await markAsRead(notificationId).unwrap();
    } catch (error) {
      toast.error("Failed to mark notification as read:", error);
    }
  };

  useEffect(() => {
    if (inspirationsData) {
      setInspirations(inspirationsData?.data)
    }
  }, [inspirationsData]);
  
  return (
    <CustomDashboardLayout>
      <div className="sm:flex items-start justify-between gap-2">
        {/* User Greeting Card */}
        <div className="flex flex-col flex-1 space-y-4">
          <Card className="shadow-sm text-black text-sm mb-1">
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={userProfile?.data?.profileImage || 'https://via.placeholder.com/80'}
                />
              </div>
              <div className="flex-1">
                <h2> Hi {user?.user.firstName} 👋</h2>
                <div className="text-gray-500">You're amazing!</div>
              </div>
              <div>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </Card>

          {/* Recent Notifications */}
          <Card title="Recent Notifications" className="shadow-sm mb-1">
            <div className="space-y-2 p-2 overflow-y-auto h-[230px]">
              {isLoading ? (
                <Loader />
              ) : (
                <ul className="space-y-4">
                  {notificationsData?.data?.map((notification) => (
                    <li
                      key={notification.id}
                      className="cursor-pointer flex justify-between items-center hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div>
                        <p className={`font-medium truncate ${!notification.isRead ? "text-blue-600" : "text-gray-800"}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          {/* Recent Inspirations */}
          <Card title="Inspiration Quotations" className="shadow-sm">
            <div className="space-y-2 p-2 overflow-y-auto h-52">
              {inspirations?.map((inspiration) => (
                <div key={inspiration.id} className="border-b p-3">
                  <p className="text-red-500 font-medium">{inspiration.title}</p>
                  <div>
                    <p className="text-sm text-gray-600 whitespace-normal break-words">
                      {inspiration.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>
                      Posted By:
                      <Tag className="ml-2" color="red">
                        {`${inspiration?.mentor.firstName} ${inspiration?.mentor.lastName}`}
                      </Tag>
                    </span>
                    <span>
                      Posted At:
                      <Tag className="ml-2" color="blue">
                        {new Date(inspiration.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </Tag>
                    </span>
                    <div>
                      <LikeOutlined />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity Calendar and Chats */}
        <div className="sm:w-4/12">
          <Card title="Activity Calendar" className="shadow-sm mb-1">
            <MentorshipCalendar />
          </Card>

          {/* Chats */}
          <Chat />
        </div>
      </div>
    </CustomDashboardLayout>
  );
};

export default YouthDashboardPage;
