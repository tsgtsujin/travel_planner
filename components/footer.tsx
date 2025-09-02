import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-100 text-white p-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="ml-5">
            <div className="font-bold text-lg mb-2">PLANNY</div>
            <div className="text-xs">
              <p>EXPLORE MORE PLAN LESS</p>
              <p>© 2025 ОН</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Холбоо барих</h3>
            <div className="text-xs space-y-4">
              <p>Утас: +976 86252122</p>
              <p>И-мэйл: ujinzolboot@gmail.com</p>
              <p>Хаяг: Монгол улс, Улаанбаатар</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Хуудсууд</h3>
            <div className="text-xs space-y-4">
              <p>
                <a href="/about" className="hover:underline">
                  Бидний тухай
                </a>
              </p>
              <p>
              <a href="/contact" className="hover:underline">
                Холбоо барих
              </a>
            </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Аймгууд</h3>
            <div className="text-xs space-y-2">
              <p>
                <Link href="/province/Архангай" className="hover:underline">
                Архангай
                </Link>
              </p>
              <p>
                <Link href="/province/Дундговь" className="hover:underline">
                Дундговь
                </Link>
              </p>
              <p>
                <Link href="/province/Завхан" className="hover:underline">
                Завхан
                </Link>
              </p>
              <p>
                <Link href="/province/Увс" className="hover:underline">
                Увс
                </Link>
              </p>
              <p>
                <Link href="/province/Хөвсгөл" className="hover:underline">
                Хөвсгөл
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
  )
}

