const products = [
  // =================== CARS ===================
  {
    id: 1,
    title: "Hyundai Creta",
    category: "Cars",
    price: 2500,
    location: "Indore",
    rating: 4.8,
    image: "https://img-ik.cars.co.za/news-site-za/images/2022/03/Hyundai-Grand-Creta-main.jpg?tr=w-1200,h-800",

    owner: {
      name: "Devraj Singh",
      phone: "9098987675",
      email: "devraj@gmail.com",
    },
  },
  {
    id: 2,
    title: "Mahindra Thar",
    category: "Cars",
    price: 3500,
    location: "Bhopal",
    rating: 4.9,
    image: "https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20200821125810_2020-Mahindra-Thar-interior-details-1.jpg?w=728&q=75&fm=auto",

    owner: {
      name: "Abhijeet Singh",
      phone: "9876543210",
      email: "abhi@gmail.com",
    },
  },
  {
    id: 3,
    title: "Toyota Fortuner",
    category: "Cars",
    price: 4500,
    location: "Delhi",
    rating: 4.9,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3s_o-BQtpo4lEoehxc3wp2-GvYihjtlMN_gSfabAT9hSEOilbkxOLiYgY&s=10",

    owner: {
      name: "Jayraj",
      phone: "9876589456",
      email: "jayraj@gmail.com",
    },
  },
  {
    id: 4,
    title: "Maruti Swift",
    category: "Cars",
    price: 1800,
    location: "Jaipur",
    rating: 4.6,
    image: "https://kvrmaruti.com/storage/upload/vehicle/colors/1626158826_DzireSherwoodBrownmerged-v5.webp",

    owner: {
      name: "Amit",
      phone: "9786543250",
      email: "amit@gmail.com",
    },
  },

  // =================== BIKES ===================
  {
    id: 5,
    title: "Royal Enfield Classic 350",
    category: "Bikes",
    price: 1200,
    location: "Indore",
    rating: 4.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVgUUV9Yynt8sztPBZCyHAr8bhLwgBnNvu5X0gPU0nVAc8TGND7xE5UsQ&s=10",

    owner: {
      name: "Rahul Sharma",
      phone: "9876543211",
      email: "rahul.sharma@gmail.com",
    },
  },
  {
    id: 6,
    title: "KTM Duke 390",
    category: "Bikes",
    price: 1500,
    location: "Pune",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Amit Verma",
      phone: "9876543212",
      email: "amit.verma@gmail.com",
    },
  },
  {
    id: 7,
    title: "Yamaha R15",
    category: "Bikes",
    price: 1300,
    location: "Mumbai",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Rohit Jain",
      phone: "9876543213",
      email: "rohit.jain@gmail.com",
    },
  },
  {
    id: 8,
    title: "Honda Activa 6G",
    category: "Bikes",
    price: 500,
    location: "Indore",
    rating: 4.5,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/UX/GR/UR/160273223/honda-pearl-precious-white-activa-6g-dlx-scooter-500x500.jpg",

    owner: {
      name: "Vikas Patel",
      phone: "9876543214",
      email: "vikas.patel@gmail.com",
    },
  },

  // =================== LAPTOPS ===================
  {
    id: 9,
    title: "MacBook Pro M3",
    category: "Laptops",
    price: 1200,
    location: "Delhi",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Ravi Singh",
      phone: "9876543225",
      email: "ravi.singh@gmail.com",
    },
  },
  {
    id: 10,
    title: "Dell XPS 15",
    category: "Laptops",
    price: 900,
    location: "Noida",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Piyush Soni",
      phone: "9876543224",
      email: "piyush.soni@gmail.com",
    },
  },
  {
    id: 11,
    title: "HP Pavilion",
    category: "Laptops",
    price: 700,
    location: "Indore",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Ankit Verma",
      phone: "9876543223",
      email: "ankit.verma@gmail.com",
    },
  },
  {
    id: 12,
    title: "Lenovo Legion 5",
    category: "Laptops",
    price: 1100,
    location: "Bangalore",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Ankit Verma",
      phone: "9876543223",
      email: "ankit.verma@gmail.com",
    },
  },

  // =================== CAMERAS ===================
  {
    id: 13,
    title: "Canon EOS R10",
    category: "Cameras",
    price: 900,
    location: "Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Mohit Sharma",
      phone: "9876543222",
      email: "mohit.sharma@gmail.com",
    },
  },
  {
    id: 14,
    title: "Sony Alpha A6400",
    category: "Cameras",
    price: 1100,
    location: "Mumbai",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Nikhil Jain",
      phone: "9876543221",
      email: "nikhil.jain@gmail.com",
    },
  },
  {
    id: 15,
    title: "Nikon D7500",
    category: "Cameras",
    price: 850,
    location: "Pune",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Akash Gupta",
      phone: "9876543220",
      email: "akash.gupta@gmail.com",
    },
  },
  {
    id: 16,
    title: "GoPro Hero 12",
    category: "Cameras",
    price: 700,
    location: "Goa",
    rating: 4.8,
    image: "https://x.imastudent.com/content/0051168_gopro-hero12-black-creator-edition-bundle_500.png",

    owner: {
      name: "Deepak Sharma",
      phone: "9876543219",
      email: "deepak.sharma@gmail.com",
    },
  },

  // =================== GAMING ===================
  {
    id: 17,
    title: "PlayStation 5",
    category: "Gaming",
    price: 800,
    location: "Indore",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Arjun Mehta",
      phone: "9876543218",
      email: "arjun.mehta@gmail.com",
    },
  },
  {
    id: 18,
    title: "Xbox Series X",
    category: "Gaming",
    price: 750,
    location: "Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Manish Yadav",
      phone: "9876543217",
      email: "manish.yadav@gmail.com",
    },
  },
  {
    id: 19,
    title: "Nintendo Switch",
    category: "Gaming",
    price: 500,
    location: "Mumbai",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Suresh Gupta",
      phone: "9876543216",
      email: "suresh.gupta@gmail.com",
    },
  },
  {
    id: 20,
    title: "Meta Quest 3",
    category: "Gaming",
    price: 900,
    location: "Bangalore",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Karan Singh",
      phone: "9876543215",
      email: "karan.singh@gmail.com",
    },
  },

  // =================== FURNITURE ===================
  {
    id: 21,
    title: "Luxury Sofa Set",
    category: "Furniture",
    price: 700,
    location: "Indore",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Vikas Patel",
      phone: "9876543214",
      email: "vikas.patel@gmail.com",
    },
  },
  {
    id: 22,
    title: "Office Chair",
    category: "Furniture",
    price: 300,
    location: "Bhopal",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop",

    owner: {
      name: "Neeraj Sharma",
      phone: "9876543226",
      email: "neeraj.sharma@gmail.com",
    },
  },
  {
    id: 23,
    title: "Study Table",
    category: "Furniture",
    price: 350,
    location: "Delhi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",

    owner: {
  name: "Vivek Mishra",
  phone: "9876543227",
  email: "vivek.mishra@gmail.com",
},
  },
  {
    id: 24,
    title: "Dining Table",
    category: "Furniture",
    price: 600,
    location: "Jaipur",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",

    owner: {
  name: "Yash Thakur",
  phone: "9876543228",
  email: "yash.thakur@gmail.com",
},
  },

  // =================== TOOLS ===================
  {
    id: 25,
    title: "Bosch Drill Machine",
    category: "Tools",
    price: 250,
    location: "Indore",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",

    owner: {
  name: "Harsh Vardhan",
  phone: "9876543229",
  email: "harsh.vardhan@gmail.com",
},
  },
  {
    id: 26,
    title: "Angle Grinder",
    category: "Tools",
    price: 300,
    location: "Pune",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",

    owner: {
  name: "Rajat Malviya",
  phone: "9876543230",
  email: "rajat.malviya@gmail.com",
},
  },
  {
    id: 27,
    title: "Pressure Washer",
    category: "Tools",
    price: 500,
    location: "Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",

    owner: {
  name: "Abhishek Raj",
  phone: "9876543231",
  email: "abhishek.raj@gmail.com",
},
  },
  {
    id: 28,
    title: "Ladder",
    category: "Tools",
    price: 150,
    location: "Indore",
    rating: 4.4,
    image: "https://cdn.shopify.com/s/files/1/0859/4545/0780/files/3_47aeeee7-7525-46ca-802c-bde997087b1f.png?v=1775559817",

    owner: {
  name: "Shubham Tiwari",
  phone: "9876543232",
  email: "shubham.tiwari@gmail.com",
},
  },

  // =================== CAMPING ===================
{
  id: 29,
  title: "Camping Tent",
  category: "Camping",
  price: 600,
  location: "Manali",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Rahul Sharma",
    phone: "9876543226",
    email: "rahul.sharma@gmail.com",
  },
},
{
  id: 30,
  title: "Sleeping Bag",
  category: "Camping",
  price: 250,
  location: "Shimla",
  rating: 4.6,
  image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Amit Verma",
    phone: "9876543227",
    email: "amit.verma@gmail.com",
  },
},
{
  id: 31,
  title: "Camping Stove",
  category: "Camping",
  price: 200,
  location: "Rishikesh",
  rating: 4.5,
  image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Rohit Jain",
    phone: "9876543228",
    email: "rohit.jain@gmail.com",
  },
},
{
  id: 32,
  title: "Hiking Backpack",
  category: "Camping",
  price: 300,
  location: "Dehradun",
  rating: 4.7,
  image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Vikas Patel",
    phone: "9876543229",
    email: "vikas.patel@gmail.com",
  },
},

// =================== SPEAKERS ===================
{
  id: 33,
  title: "JBL Flip 6",
  category: "Speakers",
  price: 350,
  location: "Indore",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Karan Singh",
    phone: "9876543230",
    email: "karan.singh@gmail.com",
  },
},
{
  id: 34,
  title: "Sony SRS-XB33",
  category: "Speakers",
  price: 400,
  location: "Mumbai",
  rating: 4.7,
  image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Suresh Gupta",
    phone: "9876543231",
    email: "suresh.gupta@gmail.com",
  },
},
{
  id: 35,
  title: "boAt Stone 1500",
  category: "Speakers",
  price: 250,
  location: "Delhi",
  rating: 4.5,
  image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/speaker/g/p/i/-original-imah4gnj3jg9zvup.jpeg?q=70",

  owner: {
    name: "Manish Yadav",
    phone: "9876543232",
    email: "manish.yadav@gmail.com",
  },
},
{
  id: 36,
  title: "Marshall Emberton II",
  category: "Speakers",
  price: 500,
  location: "Bangalore",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Arjun Mehta",
    phone: "9876543233",
    email: "arjun.mehta@gmail.com",
  },
},

// =================== MOBILES ===================
{
  id: 37,
  title: "iPhone 15 Pro",
  category: "Mobiles",
  price: 1200,
  location: "Delhi",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Deepak Sharma",
    phone: "9876543234",
    email: "deepak.sharma@gmail.com",
  },
},
{
  id: 38,
  title: "Samsung Galaxy S25",
  category: "Mobiles",
  price: 1000,
  location: "Mumbai",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Akash Gupta",
    phone: "9876543235",
    email: "akash.gupta@gmail.com",
  },
},
{
  id: 39,
  title: "OnePlus 13",
  category: "Mobiles",
  price: 900,
  location: "Indore",
  rating: 4.7,
  image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Nikhil Jain",
    phone: "9876543236",
    email: "nikhil.jain@gmail.com",
  },
},
{
  id: 40,
  title: "Google Pixel 9",
  category: "Mobiles",
  price: 950,
  location: "Bangalore",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Mohit Sharma",
    phone: "9876543237",
    email: "mohit.sharma@gmail.com",
  },
},

// =================== EVENT ITEMS ===================
{
  id: 41,
  title: "DJ Sound System",
  category: "Event Items",
  price: 2500,
  location: "Indore",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Ankit Verma",
    phone: "9876543238",
    email: "ankit.verma@gmail.com",
  },
},
{
  id: 42,
  title: "HD Projector",
  category: "Event Items",
  price: 1200,
  location: "Bhopal",
  rating: 4.7,
  image: "https://m.media-amazon.com/images/I/71fKaWvxCmL._AC_UF1000,1000_QL80_.jpg",

  owner: {
    name: "Piyush Soni",
    phone: "9876543239",
    email: "piyush.soni@gmail.com",
  },
},
{
  id: 43,
  title: "LED Wall",
  category: "Event Items",
  price: 5000,
  location: "Delhi",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Ravi Singh",
    phone: "9876543240",
    email: "ravi.singh@gmail.com",
  },
},
{
  id: 44,
  title: "Party Lights",
  category: "Event Items",
  price: 800,
  location: "Jaipur",
  rating: 4.6,
  image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Neeraj Sharma",
    phone: "9876543241",
    email: "neeraj.sharma@gmail.com",
  },
},

// =================== SPORTS ===================
{
  id: 45,
  title: "Cricket Kit",
  category: "Sports",
  price: 400,
  location: "Indore",
  rating: 4.7,
  image: "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/5b0ea239e50527b43e3253a7f103e237/s/p/spliit-x1-junior-cricket-set-web-images-combo-with-helmet_1.webp",

  owner: {
    name: "Vivek Mishra",
    phone: "9876543242",
    email: "vivek.mishra@gmail.com",
  },
},
{
  id: 46,
  title: "Football Kit",
  category: "Sports",
  price: 300,
  location: "Mumbai",
  rating: 4.6,
  image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Yash Thakur",
    phone: "9876543243",
    email: "yash.thakur@gmail.com",
  },
},
{
  id: 47,
  title: "Badminton Set",
  category: "Sports",
  price: 250,
  location: "Delhi",
  rating: 4.5,
  image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2026/6/15/720f016d-6e36-44be-b2b1-28b84d2c7ed1_76585.jpg",

  owner: {
    name: "Harsh Vardhan",
    phone: "9876543244",
    email: "harsh.vardhan@gmail.com",
  },
},
{
  id: 48,
  title: "Mountain Bicycle",
  category: "Sports",
  price: 700,
  location: "Manali",
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",

  owner: {
    name: "Rajat Malviya",
    phone: "9876543245",
    email: "rajat.malviya@gmail.com",
  },
},

];

export default products;