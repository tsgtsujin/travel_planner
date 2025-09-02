import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* <Header /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 pb-16">
        {/* Main Card */}
        <div className="bg-sky-100/100 rounded-lg p-6 max-w-2xl w-full mx-auto">
          <div className="mb-6">
            <div className="relative w-full h-48 mb-4">
              <Image src="/images/Smallinfo.jpg" alt="Mountain lake" fill className="object-cover rounded-md"/>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 rounded-md">
                <h1 className="font-bold text-xl">EXPLORE MORE</h1>
                <h2 className="font-bold text-xl">PLAN LESS</h2>
              </div>
            </div>

            <p className="text-sm text-center mb-6">
            Манай хиймэл оюун ухаанаар ажилладаг аялал төлөвлөгчөөр стрессгүй аялах аз жаргалыг мэдрээрэй. Өөрт тохирсон маршрутыг хялбархан  боловсруулж, 
            тохирсон зөвлөмжийг судалж, мөрөөдлийн газраа нарийвчлалтайгаар удирдаарай. Амралтын өдрүүдээр хурдан зугаалах юм уу, олон өдрийн адал явдал ч бай бидний ухаалаг 
            технологи нь бүх нарийн ширийн зүйлийг багтаасан бөгөөд ингэснээр та мартагдашгүй дурсамжийг бүтээхэд анхаарлаа төвлөрүүлж чадна.
            </p>

            <h3 className="text-center font-semibold mb-4">Бид танд юу санал болгож байна вэ?</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-sky-200 p-4 rounded-md flex flex-col items-center text-center hover:bg-sky-300 hover:text-white">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  <span className="text-xs">1</span>
                </div>
                <p className="text-xs">Хувь хүний сонирхолд тохирсон ​​​​маршрутнууд</p>
              </div>
              <div className="bg-sky-200 p-4 rounded-md flex flex-col items-center text-center hover:bg-sky-300 hover:text-white">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  <span className="text-xs">2</span>
                </div>
                <p className="text-xs">Цаг хэмнэсэн ая тухтай байдал</p>
              </div>
              <div className="bg-sky-200 p-4 rounded-md flex flex-col items-center text-center hover:bg-sky-300 hover:text-white">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  <span className="text-xs">3</span>
                </div>
                <p className="text-xs">Аялал жуулчлалын талаархи дэлгэрэнгүй мэдээлэл</p>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="w-full overflow-hidden relative ">
          <h2 className="text-white text-center text-xl font-semibold pt-10 mb-10">Манай төлөвлөгөөнд багтсан аймгууд</h2>

          {/* Аймгуудыг хэвтээ чиглэлд байрлуулсан хэсэг */}
          <div className="whitespace-nowrap animate-scroll flex gap-10">
            {/* ДУНДГОВЬ */}
            <Link href="/province/Дундговь" className="relative group w-[300px] shrink-0 ">
              <Image src="/images/Dundgobi.jpeg" alt="ДУНДГОВЬ" width={400} height={400} className="w-full h-72 object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-white font-semibold">ДУНДГОВЬ</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                {/* <ArrowRight className="text-white" /> */}
              </div>
            </Link>

            {/* УВС */}
            <Link href="/province/Увс" className="relative group w-[300px] shrink-0">
              <Image src="/images/Uvs.jpg" alt="УВС" width={400} height={400} className="w-full h-72 object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-white font-semibold">УВС</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
              </div>
            </Link>

            {/* АРХАНГАЙ */}
            <Link href="/province/Архангай" className="relative group w-[300px] shrink-0">
              <Image src="/images/Arhangai.jpg" alt="АРХАНГАЙ" width={400} height={400} className="w-full h-72 object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-white font-semibold">АРХАНГАЙ</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
              </div>
            </Link>

            {/* ХӨВСГӨЛ */}
            <Link href="/province/Хөвсгөл" className="relative group w-[300px] shrink-0">
              <Image src="/images/Khuvsgul.jpg" alt="ХӨВСГӨЛ" width={400} height={400} className="w-full h-72 object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-white font-semibold">ХӨВСГӨЛ</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
              </div>
            </Link>

            {/* ЗАВХАН */}
            <Link href="/province/Завхан" className="relative group w-[300px] shrink-0">
              <Image src="/images/Zavkhan.jpg" alt="БАЯН-ӨЛГИЙ" width={400} height={400} className="w-full h-72 object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center rounded-md">
                <span className="text-white font-semibold">ЗАВХАН</span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md"></div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

