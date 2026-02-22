import { BellIcon } from "@/components/icons";

export default function Header(props: {title: string}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
      <h1 className="text-xl font-semibold text-zinc-900">
        {props.title}
      </h1>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-zinc-900">
              {props.title}
            </p>
            <p className="text-xs text-zinc-500">superadmin@manageit.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
