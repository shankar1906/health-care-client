import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Map from "@/components/Map"

export default function Home() {
  return (
    (<div className="min-h-screen bg-gradient-to-r from-purple-500 to-orange-500">
      {/* Banner */}
      <section className="py-20 text-center text-white h-[100vh] flex flex-col justify-center items-center" style={{
      backgroundImage: "url('https://www.econlib.org/wp-content/uploads/2018/04/health-care-.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
        <h1 className="text-5xl font-bold mb-4 text-black">Welcome to IPRMS</h1>
        <p className="text-xl mb-8 text-black">Integrated Patient Record Management System</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/doctor/signin">Doctor Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/patient/signin">Patient Login</Link>
          </Button>
        </div>
      </section>
      {/* About Us */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">
            IPRMS is a state-of-the-art patient record management system designed to streamline healthcare processes and
            improve patient care.
          </p>
        </div>
      </section>
      {/* Reviews */}
      <section className="py-16 bg-gray-100" id="reviews">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Excellent Service</CardTitle>
                  <CardDescription>Dr. Ravi Kumar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>IPRMS has significantly enhanced our healthcare delivery in Tamil Nadu.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Location Map */}
      <section className="py-16 bg-white" id="location">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
          <div className="h-[400px] w-full">
            <Map />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 IPRMS. All rights reserved.</p>
        </div>
      </footer>
    </div>)
  );
}

