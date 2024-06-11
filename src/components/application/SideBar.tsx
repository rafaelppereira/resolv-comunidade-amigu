export function SideBar() {
  return (
    <aside className="w-80 bg-zinc-800 rounded-lg overflow-hidden">
      <img src="banner.png" alt="" className="w-full h-24 object-cover " />

      <div className="flex flex-col items-center ">
        <img
          src="https://github.com/Bernardopadilha.png"
          alt="Foto de Bernardo Alves Padilha"
          className="rounded-full w-28 relative -top-12"
        />

        <div className="-mt-8 flex flex-col items-center">
          <h6 className="text-gray-100 font-medium text-lg">
            Bernardo Padilha
          </h6>
          <span className="text-zinc-400 text-sm">@bernardopadilha</span>
        </div>
      </div>
    </aside>
  )
}
