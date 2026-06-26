import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  promotionalPrice: number;
  image: string;
  rating: number;
}

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export default function ProductCarousel({ products, title = "Produtos em Destaque" }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const itemsPerView = 4;

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsPerView));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, products.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / itemsPerView)) % Math.ceil(products.length / itemsPerView));
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsPerView));
  };

  const visibleProducts = products.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={goToPrevious}
              className="p-2 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-1/4 min-w-0"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent transition group h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur rounded-full hover:bg-accent hover:text-accent-foreground transition opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? "text-accent" : "text-muted"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                      <span className="text-xl font-bold text-accent">
                        R$ {product.promotionalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-2 rounded-lg font-medium transition">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(Math.ceil(products.length / itemsPerView))].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoPlay(false);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition ${
                i === currentIndex ? "bg-accent w-8" : "bg-muted w-2"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
