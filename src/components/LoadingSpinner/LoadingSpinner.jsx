

import { Spinner } from "@/components/ui/spinner"


export default function LoadingSpinner() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
          <Spinner className="size-8 text-black" />
        <p className="text-gray-100 font-bold">Loading...</p>
      </div>
    </div>
  )
}