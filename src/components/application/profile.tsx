import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface UserProps {
  name: string
  username: string
  email: string
  createdAt: string
  avatarUrl: string
  thumbnailUrl: string
}

interface ProfileProps {
  userData: UserProps | undefined
}

export function Profile({ userData }: ProfileProps) {
  return (
    <aside className="lg:sticky lg:top-[calc(2rem+4rem)] shrink-0 w-full lg:w-72 bg-brand-zinc-900 rounded-lg overflow-hidden border-2 border-brand-zinc-700">
      <img
        src={userData?.thumbnailUrl}
        alt={`Banner do ${userData?.name}`}
        className="w-full h-24 object-cover"
      />

      <div className="flex flex-col items-center">
        <img
          src={userData?.avatarUrl}
          alt={`Foto de ${userData?.name}`}
          className="rounded-full w-28 relative -top-12"
        />

        <div className="-mt-8 flex flex-col items-center">
          <h6 className="text-gray-100 font-medium text-lg">
            {userData?.name}
          </h6>
          <span className="text-zinc-400 text-sm">@{userData?.username}</span>
        </div>
      </div>

      {userData?.createdAt && (
        <div className="border-t-2 border-t-brand-zinc-700 mt-6 flex items-center justify-center py-4">
          <span className="text-zinc-400 text-xs">
            {`Entrou desde ${format(new Date(userData.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`}
          </span>
        </div>
      )}
    </aside>
  )
}
