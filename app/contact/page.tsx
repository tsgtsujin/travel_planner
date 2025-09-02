import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="flex-1 flex flex-col py-8 px-4 bg-black/30">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-center text-white text-2xl font-semibold mb-10">Холбогдох</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
          {/* Left side - Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/Contact.png"
                alt="Camping illustration"
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Right side - Contact Info */}
            <div className="space-y-5 mt-10">
              <div className="bg-stone-200 p-4 rounded flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <span>contact@planny.com</span>
              </div>

              <div className="bg-stone-200 p-4 rounded flex items-center gap-3">
                <Phone className="w-6 h-6" />
                <span>+97699232122</span>
              </div>

              <div className="bg-stone-200 p-4 rounded flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <span>Монгол улс, Улаанбаатар хот</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

