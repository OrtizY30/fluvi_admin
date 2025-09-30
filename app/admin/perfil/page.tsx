import HeaderProfile from '@/components/profile/HeaderProfile'
import ProfileForm from '@/components/profile/ProfileForm'
import ThemeProfile from '@/components/profile/ThemeProfile'
import getToken from '@/src/auth/token';
import { ThemeApiResponseSchema } from '@/src/schemas';
import React from 'react'

async function getTheme(){
   const token = await getToken();
    const url = `${process.env.API_URL}/theme`;
  
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await req.json();
    const theme = ThemeApiResponseSchema.parse(json);
    return theme;
}

export default async function ProfilePage() {
  const theme = await getTheme();

  return (
        <div className="flex-1 flex  h-full  flex-col bg-surface-baseoverflow-hidden bg-surface-base">
            <HeaderProfile/>
          <div className="flex-1 px-11 overflow-y-auto">
            <div className="grid gap-6 lg:grid-cols-3">

            <ProfileForm/>
            <ThemeProfile theme={theme}/>
            </div>
          </div>
        </div>

  )
}
