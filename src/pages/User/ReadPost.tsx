import { useParams } from 'react-router-dom';

function ReadPost() {

  const { postId } = useParams();


  return (
    <div>
      <h1>Halaman Profil Pengguna</h1>
      <p>
        Anda sedang melihat profil untuk User ID: <strong>{postId}</strong>
      </p>
    </div>
  );
}



export default ReadPost;