import pool from "@/lib/db";

async function getProducts() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = (await getProducts()) as any[];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section - Dibuat lebih elegan dengan gradient */}
      <section className="relative overflow-hidden bg-slate-900 text-white p-16 rounded-[2rem] shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-blue-600 rounded-full">
            Enterprise Solutions
          </span>
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Elevate Your{" "}
            <span className="text-blue-400">IT Infrastructure.</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Dapatkan perangkat keras dan sistem informasi terbaik untuk
            mendukung operasional bisnis Anda dengan standar rumah sakit dan
            korporasi.
          </p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all shadow-lg">
            Jelajahi Katalog
          </button>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      </section>

      {/* Product Grid Section */}
      <div className="space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Produk Unggulan
            </h3>
            <p className="text-slate-500">
              Koleksi perangkat IT standar industri
            </p>
          </div>
          <span className="text-sm font-medium text-blue-600">
            {products.length} Barang ditemukan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300"
              >
                {/* Image Placeholder dengan Badge */}
                <div className="relative bg-slate-50 aspect-[4/5] flex items-center justify-center overflow-hidden">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
                    📦
                  </span>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider text-slate-600">
                      Standardized
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed italic">
                    {product.description ||
                      "Tidak ada deskripsi teknis tersedia."}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
                          Harga Investasi
                        </p>
                        <p className="text-blue-600 font-extrabold text-xl tracking-tight">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(product.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter text-right">
                          Ketersediaan
                        </p>
                        <span
                          className={`text-xs font-bold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                        >
                          {product.stock > 0
                            ? `${product.stock} Unit`
                            : "Habis"}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm tracking-wide group-hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer">
                      Tambah Ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-slate-500 font-medium">
                Maaf, saat ini belum ada produk dalam katalog kami.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
