import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from 'react-icons/fa';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviews = [] }) => {
  return (
    <div className="w-11/12 mx-auto my-10">

      {/* 🟦 Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#D72050] hover:text-[#b60534] py-4">
        What Our Users Say
      </h2>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 50,
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper py-10"
      >

        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="max-w-sm bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200 mx-auto">

              <FaQuoteLeft className="text-primary text-2xl mb-4" />

              {/* Review Text */}
              <p className="mb-4 text-gray-700">{review.review}</p>

              <div className="border-t border-dashed border-gray-300 my-4"></div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full border"
                />

                <div>
                  <h3 className="font-semibold text-lg">{review.userName}</h3>
                  <p className="text-sm text-gray-500">
                    ⭐ {review.ratings} / 5
                  </p>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
