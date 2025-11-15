import { Helmet } from "react-helmet";
import { HomeCarousel } from "@/layouts/user/component/HomeCarousel";
import { Link } from "react-router-dom";
import imgSample from "@/assets/img/example-1.jpeg"
import PrimaryButton from '@/layouts/user/component/Button/PrimaryButton'

import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Post } from "@/types/postTypes";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        // 2. Gunakan URL yang benar untuk daftar pengguna (tanpa ID di belakang)
        const response = await axios.get<ApiResponse<Post[]>>(
          "http://localhost:8000/api/public/post",
          {
            signal: controller.signal,
          }
        );

        // 3. Set state dengan array data yang benar
        setPosts(response.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Gagal mengambil data News.");
      }
    };
    // 4. Panggil fungsi fetchPosts
    fetchPosts();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Home | Web Berita Noyan</title>
        <meta name="description" content="Selamat datang di website saya." />
      </Helmet>
      <div className="grid grid-cols-3 grid-rows-1 gap-1">
        <div className="col-span-2 ">
          <HomeCarousel />
        </div>
        <div className="flex flex-col col-start-3 px-2 py-1">
          <h3 className="flex justify-center p-1 text-lg font-bold text-white bg-blue-600 -tracking-tight text w-28">
            Hot News
          </h3>
          <ul className="mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <li
                className="flex flex-row w-full gap-2 pb-2 border-b-2"
                key={index}>
                <img src={imgSample} alt="example" className="w-20 h-16" />
                <div className="justify-between w-full h-16">
                  <p className="text-lg font-bold tracking-tighter">
                    Title example for how news {index + 1}
                  </p>
                  <span className="bottom-0 text-xs">10 minutes ago</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-5">
          {posts.map((post, index) => (
            <Link
              to={`/read/${index + 1}`}
              key={post.slug}
              className="opacity-100">
              <img
                src={imgSample}
                alt="example"
                className="w-full transition duration-300 ease-in-out hover:opacity-70"
              />
              <span className="bottom-0 text-xs">10 minutes ago</span>
              <p className="text-lg font-bold tracking-tighter">{post.title}</p>
            </Link>
          ))}
          {/* {Array.from({ length: 12 }, (_, index) => (
            <Link to={`/read/${index + 1}`} key={index} className="opacity-100">
              <img
                src={imgSample}
                alt="example"
                className="w-full transition duration-300 ease-in-out hover:opacity-70"
              />
              <span className="bottom-0 text-xs">10 minutes ago</span>
              <p className="text-lg font-bold tracking-tighter">
                Title example for how news {index + 1}
              </p>
            </Link>
          ))} */}
        </div>
        <span className="justify-center">
          <PrimaryButton text="See more" link="/about" />
        </span>
      </div>
    </>
  );
};

export default Home;
