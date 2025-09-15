import React, { useState } from 'react';
import BasicInfo from '../../components/profile/BasicInfo';
import ChangeEmail from '../../components/profile/ChangeEmail';
import ChangePassword from '../../components/profile/ChangePassword';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../layouts/PageLayout';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('basic');

    const tabClass = (tab) => `px-4 py-2 font-semibold rounded transition-colors duration-200 
    ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;

    return (
        <PageLayout>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-1 justify-start md:justify-center'>
                    <button onClick={() => setActiveTab('basic')}
                        className={tabClass('basic')}>Basic information</button>
                    <button onClick={() => setActiveTab('email')}
                        className={tabClass('email')}>Email</button>
                    <button onClick={() => setActiveTab('password')}
                        className={tabClass('password')}>Change password</button>
                </div>
                <div>
                    {activeTab === 'basic' && <BasicInfo user={user} />}
                    {activeTab === 'email' && <ChangeEmail user={user} />}
                    {activeTab === 'password' && <ChangePassword />}
                </div>
            </div>

        </PageLayout>
    )
}

export default Profile