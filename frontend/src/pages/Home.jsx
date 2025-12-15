import React, { useEffect } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) navigate('/dashboard', { replace: true });
    } catch (e) {
      // ignore
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <Heading label={"Fast, Simple Payments"} />
          <SubHeading label={"Send money, manage balance and pay bills — all in one secure app."} />

          <div className="flex gap-4 justify-center md:justify-start mt-6">
            <Link to="/signup">
              <Button label={"Get Started"} />
            </Link>

            <Link to="/signin">
              <button className="text-black bg-white my-3 py-[8px] px-10 rounded-md border border-gray-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Quick Features</h3>
            <ul className="space-y-3 text-gray-700">
              <li>💸 Instant transfers to other users</li>
              <li>🔒 Secure authentication and wallet</li>
              <li>⚡ Fast settlement and simple UI</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h4 className="text-2xl font-bold mb-4 text-center">Why choose this app?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-sm text-center">
            <div className="text-3xl">🔐</div>
            <p className="font-semibold mt-2">Secure</p>
            <p className="text-sm text-gray-500 mt-1">Your data and transactions are protected.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm text-center">
            <div className="text-3xl">🚀</div>
            <p className="font-semibold mt-2">Fast</p>
            <p className="text-sm text-gray-500 mt-1">Low latency transfers and quick onboarding.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm text-center">
            <div className="text-3xl">🤝</div>
            <p className="font-semibold mt-2">Easy</p>
            <p className="text-sm text-gray-500 mt-1">Simple UI to send money in a few taps.</p>
          </div>
        </div>
      </section>

      <footer className="mt-12 py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center text-gray-600">© {new Date().getFullYear()} Payment App — Built with Tailwind</div>
      </footer>
    </div>
  )
}

export default Home