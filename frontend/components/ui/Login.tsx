import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BACKEND_URL } from "@/config"
export function ButtonWithIcon() {
  const router = useRouter()
  return (
    <Button onClick={() => {
      router.push(`/signin`)
    }}>
      <EnvelopeOpenIcon /> Signin
    </Button>
  )
}
