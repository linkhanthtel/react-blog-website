import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import image4 from '../images/image4.jpg';
import Sidebar from '../components/sidebar';
import { Link } from 'react-router-dom';

function SinglePost() {
  return (
    <div className='flex justify-around my-2 mx-5'>
      <div className='w-1/4'>
        <Sidebar title={"Budget Trip"} />
      </div>
      <div className='w-100 md:w-3/4 my-2 mx-2 p-3 border-2'>
        <div className='flex justify-center items-center'>
          <img src={image4} alt="Image" className='w-96 h-72' />
        </div>
        <h1 className='my-5 text-3xl font-bold text-center'>Title</h1>
        <div className='my-5 flex justify-around'>
          <p>Lin, 1 hr ago</p>
          <div className='flex'>
              <FaRegEdit className='mr-5 text-xl'/>
              <MdDelete className='text-xl' />
          </div>
        </div>
        <div className='px-2 flex justify-center'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti inventore placeat incidunt facere animi! Perspiciatis omnis veniam porro eligendi vitae provident obcaecati, velit dicta quae. Eum quaerat fugit reiciendis similique! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam molestiae repellat delectus, et unde fugiat? Corrupti, enim sunt nostrum aspernatur quo placeat ipsa labore eligendi neque, provident minus quod aperiam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, tenetur. Ex asperiores, illo dolorem est ipsam quasi culpa omnis voluptate esse quidem deleniti doloribus suscipit iusto, dolores corporis quis at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, illum ipsam vitae velit asperiores ad odit ex exercitationem enim explicabo saepe atque ullam repellat molestias libero nesciunt architecto deserunt fugit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed nostrum et culpa magni minima illum at laborum. Accusantium maxime maiores in illo atque perferendis veniam, est sapiente perspiciatis natus aperiam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, dignissimos perspiciatis, quasi voluptatibus facere numquam ut asperiores odit recusandae sapiente ipsa quidem nostrum magnam, iste vel repellendus. Quaerat, obcaecati quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae amet cupiditate? Eum nulla quam corporis sunt neque assumenda nobis ipsam quis, obcaecati, ipsum qui animi, impedit eaque vitae nostrum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio nemo commodi beatae quod ipsa, excepturi corrupti necessitatibus tempore veritatis enim asperiores illum veniam vitae eveniet, ut tenetur voluptatem et! Nobis.</p>
        </div><br />
        <Link to="/" className='text-blue-500 mx-2 my-5'>Back to Home</Link>
      </div>
    </div>
  )
}

export default SinglePost
