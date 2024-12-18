import { Card, Calendar, Avatar } from 'antd';
import 'tailwindcss/tailwind.css';

import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import Header from '../../../components/seconday/Header';
import CustomDahboardLayout from '../../../components/seconday/CustomDashboardPagesLayout';
import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../../services/notifications';
import { loginDetails} from '../../../utils';


const DashboardPage = () => {
    const { data: notificationsData, isLoading } = useGetNotificationsQuery();
    const [markAsRead] = useMarkAsReadMutation();
    const user = loginDetails();

    const handleNotificationClick = async (notificationId: number) => {
        try {
            await markAsRead(notificationId).unwrap();
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const inspirations = [
        { id: 1, text: "The only way to do great work is to love what you do.", createdAt: "2024-12-15", liked: false },
        { id: 2, text: "Success is not the key to happiness. Happiness is the key to success.", createdAt: "2024-12-14", liked: false },
        { id: 3, text: "Believe you can and you're halfway there.", createdAt: "2024-12-13", liked: true },
    ];

    const chatMessages = [
        { id: 1, title: "John Doe", message: "Hey, are you available to meet today?", unread: true, status: "online" },
        { id: 2, title: "Jane Smith", message: "Can you review the report by EOD?", unread: false, status: "offline" },
        { id: 3, title: "Team Project", message: "The latest update is live. Check it out!", unread: true, status: "online" },
        { id: 4, title: "Alice Smith", message: "Can you review the report by EOD?", unread: false, status: "offline" },
        { id: 5, title: "Team Lead", message: "The latest update is live. Check it out!", unread: true, status: "online" },
    ];

    return (
        <>
            <Header pageTitle="Dashboard" />

            <CustomDahboardLayout>
                <div className='sm:flex items-center justify-between gap-2'>
                    {/* one */}
                    <div className='sm:w-8/12'>
                        {/* banner */}
                        <Card className="shadow-sm text-black text-sm mb-1">
                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                <Avatar size="large" icon={<UserOutlined />} className="mr-2" />
                                </div>
                                <div className="flex-1">
                                    <h2> Hi {user?.user.firstName}</h2>
                                    <div className='text-gray-500'>You're amazing!</div>
                                </div>
                                <div>
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </Card>

                        {/*  recent notifications Quotes */}
                        <Card title="Recent Notifications" className="shadow-sm mb-1">
                            <div className="space-y-2 p-2 overflow-y-auto h-[230px]">
                                {isLoading ? (
                                    <div>Loading notifications...</div>
                                ) : (
                                    <ul className="space-y-4">
                                        {notificationsData?.data.map((notification) => (
                                            <li
                                                key={notification.id}
                                                className="cursor-pointer flex justify-between items-center hover:bg-gray-100 p-2 rounded-md"
                                                onClick={() => handleNotificationClick(notification.id)}
                                            >
                                                <div>
                                                    <p className={`font-medium truncate ${!notification.isRead ? "text-blue-600" : "text-gray-800"}`}>
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Card>

                        {/*recent inspirations Quotes */}
                        <Card title="Inspiration Quotations" className="shadow-sm">
                            <div className="space-y-2 p-2 overflow-y-auto h-52">
                                {inspirations.map((inspiration) => (
                                    <div
                                        key={inspiration.id}
                                        className="border-b p-3"
                                    >
                                        <p className="text-gray-800 font-medium">{inspiration.text}</p>
                                        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                                            <span>Created: {inspiration.createdAt}</span>
                                            <div 
                                            //  onClick={() => handleLike(inspiration.id)} 
                                             >
                                                <LikeOutlined />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* two */}
                    <div className="sm:w-4/12">
                        {/* Calendar with Activities */}
                        <Card title="Activity Calendar" className="shadow-sm mb-1">
                            <Calendar fullscreen={false} />
                        </Card>

                        {/*  chats */}
                        <Card title="Chats" className="shadow-sm">
                            <div className="overflow-y-auto h-52">
                                <ul className="space-y-2">
                                    {chatMessages.map((chat, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                                        // onClick={() => handleChatClick(chat.id)}
                                        >
                                            <div>
                                                <div className='flex justify-between gap-2'>

                                                    <div
                                                        className={`font-bold ${chat.unread ? "text-blue-600" : "text-gray-800"
                                                            }`}
                                                    >
                                                        {chat.title}
                                                    </div>
                                                    <div
                                                        className={`text-xs ${chat.status === "online" ? "text-green-500" : "text-gray-500"
                                                            }`}
                                                    >
                                                        {chat.status === "online" ? "Online" : "Offline"}
                                                    </div>
                                                </div>
                                                <div className="text-gray-600 truncate">{chat.message}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </CustomDahboardLayout>
        </>
    );
};

export default DashboardPage;
