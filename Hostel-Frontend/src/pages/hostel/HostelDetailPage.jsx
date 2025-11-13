export default function HostelDetailPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8">
        {/* Hostel Image */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
          <img
            src="/hostel-image.jpg"
            alt="Hostel near Kenyatta University"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hostel Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kenyatta University Hostel</h1>
        <p className="text-gray-600 mb-4">Location: Juja, Kiambu County, near Kenyatta University</p>
        <p className="text-gray-700 mb-6">
          Comfortable and affordable hostel conveniently located just a few minutes from Kenyatta University main campus. 
          Offers a safe environment, modern amenities, and friendly management to make student life hassle-free.
        </p>

        {/* Features / Amenities */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            WiFi
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Laundry
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            Meals
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            Parking
          </span>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}