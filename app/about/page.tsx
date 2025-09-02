import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Info, Target, BarChart3 } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="flex-1 flex flex-col py-8 px-4 bg-black/30">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-center text-white text-2xl font-semibold mb-10">Бидний тухай</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left side - Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/Tent.png"
                alt="Camping illustration"
                width={700}
                height={700}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Right side - Text */}
            <div className="text-white space-y-4">
              <p className="text-sm">
              Хиймэл оюун ухааны (AI) хэрэглээ аялал жуулчлалын салбарт ч өндөр үр дүнтэй нэвтэрч байгаа бөгөөд хэрэглэгчдэд илүү хурдан, оновчтой шийдвэр гаргах боломжийг олгож байна. 
              Аяллын маршрут төлөвлөх үйл явцыг автоматжуулах замаар хиймэл оюун ухаан (AI) нь аяллын туршлагыг хялбаршуулж, илүү үр ашигтай болгох боломжийг олгоно. 
              </p>
              <p className="text-sm">
              Энэхүү төсөл нь хиймэл оюун ухаан (AI) болон графийн онолыг хослуулан аялал төлөвлөх веб аппликейшн бүтээх зорилготой.
              </p>
              <p className="text-sm">
              Уг веб аппликейшн нь хэрэглэгчийн ямар аймаг руу хэд хоног аялах болон тухайн аймагт үзэж, хийж болох үйл ажиллагааны газруудын сонголт дээр тулгуурлан оновчтой аяллын 
              төлөвлөгөөг боловсруулж, хэрэглэгчдэд аяллын маршрут, өдрүүдийн хуваарь, үйл ажиллагаа ба тэдгээрийн мэдээллүүдийг санал болгоно.
              </p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ml-20 justify-center items-center">
            <div>
                <div className="bg-red-700 text-white py-2 px-6 inline-block mb-4 rounded-md justify-center items-center">
                <h2 className="text-xl font-semibold ">Зорилго</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Left side - Text */}
                <div className="text-white text-sm">
                    <p>Хэрэглэгчдэд үр ашигтай аяллын төлөвлөгөө гаргаж өгөх.</p>
                </div>
                </div>

                <div className="bg-red-700 text-white py-2 px-6 inline-block mb-4 rounded-md">
                <h2 className="text-xl font-semibold">Цаашдын зорилго</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Text */}
                    <div className="text-white text-sm">
                        <p>-Явуулж буй үйл ажиллагаа, үйлчилгээгээ өргөжүүлэх;</p>
                        <p>-Хамрах хүрээгээ өргөжүүлэх;</p>
                    </div>
                </div>
            </div>
              {/* Right side - Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/Goal.png"
                alt="Camping illustration"
                width={420}
                height={420}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Action Goals Section */}
          <div className="mt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Right side - Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/Advantage.png"
                alt="Camping illustration"
                width={290}
                height={290}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-12 mt-12">
            <div className="bg-green-400 bg- text-white p-4 flex items-center gap-3 rounded-md">
              <BarChart3 className="w-6 h-6" />
              <span>Хувь хүний сонирхолд тохирсон ​маршрутнууд</span>
            </div>

            <div className="bg-green-500 text-white p-4 flex items-center gap-3 rounded-md">
              <Target className="w-6 h-6" />
              <span>Цаг хэмнэсэн ая тухтай байдал</span>
            </div>

            <div className="bg-green-600 text-white p-4 flex items-center gap-3 rounded-md">
              <Info className="w-6 h-6" />
              <span>Аялал жуулчлалын талаархи дэлгэрэнгүй мэдээлэл</span>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

