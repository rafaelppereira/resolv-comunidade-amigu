/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from './components/application/header'
import { Post } from './components/application/post'
import { StartPost } from './components/application/post/start-post'
import { Profile } from './components/application/profile'
import { News } from './components/application/news'
import { SkeletonPost } from './components/skeletons/skeleton-post'

import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from './_api/get-all-posts'
import { SkeletonStartPost } from './components/skeletons/skeleton-start-post'
import { useEffect } from 'react'
import { getProfile } from './_api/get-profile'
import { SkeletonUser } from './components/skeletons/skeleton-user'

export function App() {
  const { data: postsData, isLoading: isLoadingPostsData } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  })

  useEffect(() => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    })
  }, [postsData])

  return (
    <div className="w-full h-full">
      <Header />

      <div className="max-w-[90rem] w-full mt-[calc(2rem+4rem)] mb-8 mx-auto py-0 px-8 flex flex-col lg:flex-row items-start gap-8">
        {isLoadingUserData ? <SkeletonUser /> : <Profile userData={userData} />}

        <div className="flex flex-col gap-8 flex-1">
          {/* {isLoadingPostsData ? <SkeletonStartPost /> : <StartPost />} */}

          {isLoadingPostsData
            ? Array.from({ length: 3 }).map((_, i) => {
                return <SkeletonPost key={i} />
              })
            : postsData &&
              postsData.map((post, i) => {
                return <Post key={i} post={post} />
              })}
        </div>

        <News />
      </div>
    </div>
  )
}
