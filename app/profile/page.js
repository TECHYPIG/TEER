/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Ines Rita
 */

// import profilePic from 'koreanwoman.png';

function Profile() {
    return (
        <>

<nav class="bg-green-500 dark:bg-green-500">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Teer</span>
  </a>
  <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
  </div>
</nav>



<div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">

            {/* <!-- Left Side --> */}
            <div class="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div class="bg-white p-3 border-t-4 border-green-400">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""/>
                    </div>
                    <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""/>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">John Doe</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Location</span>
                            <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">Newcastle, UK</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div class="my-4"></div>
                {/* <!-- Friends card --> */}
                <div class="bg-white p-3 hover:shadow">
                    <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span class="text-green-500">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Similar Profiles</span>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""/>
                            <a href="#" class="text-main-color">Kojstantin</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                alt=""/>
                            <a href="#" class="text-main-color">James</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                alt=""/>
                            <a href="#" class="text-main-color">Natie</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                alt=""/>
                            <a href="#" class="text-main-color">Casey</a>
                        </div>
                    </div>
                </div>
                {/* <!-- End of friends card --> */}
            </div>
            {/* <!-- Right Side --> */}
            <div class="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">First Name</div>
                                <div class="px-4 py-2">John</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Last Name</div>
                                <div class="px-4 py-2">Doe</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Gender</div>
                                <div class="px-4 py-2">Male</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Contact No.</div>
                                <div class="px-4 py-2">+11 998001001</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Email.</div>
                                <div class="px-4 py-2">
                                    <a class="text-blue-800" href="mailto:john@example.com">john@example.com</a>
                                </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Birthday</div>
                                <div class="px-4 py-2">Feb 06, 1998</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit Profile </button>
                {/* <!-- End of about section --> */}

                <div class="my-4"></div>

                {/* <!-- Experience and education --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">

                    <div class="grid grid-cols-2">





<div class="lg:col-span-2 p-4 bg-white mt-3" id="posted">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">


				{/* <!-- First Column --> */}
				<div class="bg-white p-8 rounded-lg shadow-md max-w-md">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center space-x-2">
							<img src="https://placekitten.com/40/40" alt="User Avatar" class="w-8 h-8 rounded-full"/>
							<div>
								<p class="text-gray-800 font-semibold">John Doe</p>
								<p class="text-gray-500 text-sm">Posted 2 hours ago</p>
							</div>
						</div>
						<div class="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button class="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
					{/* <!-- Message --> */}
					<div class="mb-4">
						<p class="text-gray-800">Just another day with adorable kittens! 🐱 <a href="" class="text-blue-600">#CuteKitten</a>
							<a href="" class="text-blue-600">#AdventureCat</a>
						</p>
					</div>
					{/* <!-- Image --> */}
					<div class="mb-4">
						<img src="https://placekitten.com/300/300" alt="Post Image" class="w-full h-48 object-cover rounded-md"/>
					</div>
					{/* <!-- Like and Comment Section --> */}
					<div class="flex items-center justify-between text-gray-500">
						<div class="flex items-center space-x-2">
							<button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
								<svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
								</svg>
								<span>42 Likes</span>
							</button>
						</div>
						<button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
							<svg width="22px" height="22px" viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
								</g>
							</svg>
							<span>3 Comment</span>
						</button>
					</div>
				</div>
				{/* <!-- Second Column --> */}
				<div class="bg-white p-8 shadow-md rounded-lg">
					{/* <!-- User Info with Three-Dot Menu --> */}
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center space-x-2">
							<img src="https://placekitten.com/40/40" alt="User Avatar" class="w-8 h-8 rounded-full"/>
							<div>
								<p class="text-gray-800 font-semibold">John Doe</p>
								<p class="text-gray-500 text-sm">Posted 2 hours ago</p>
							</div>
						</div>
						<div class="text-gray-500 cursor-pointer">
							{/* <!-- Three-dot menu icon --> */}
							<button class="hover:bg-gray-50 rounded-full p-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="7" r="1" />
									<circle cx="12" cy="12" r="1" />
									<circle cx="12" cy="17" r="1" />
								</svg>
							</button>
						</div>
					</div>
					{/* <!-- Message --> */}
					<div class="mb-4">
						<p class="text-gray-800">Just another day with adorable kittens! 🐱 <a href="" class="text-blue-600">#CuteKitten</a>
							<a href="" class="text-blue-600">#AdventureCat</a>
						</p>
					</div>
					{/* <!-- Image --> */}
					<div class="mb-4">
						<img src="https://placekitten.com/500/300" alt="Post Image" class="w-full h-48 object-cover rounded-md"/>
					</div>
					{/* <!-- Like and Comment Section --> */}
					<div class="flex items-center justify-between text-gray-500">
						<div class="flex items-center space-x-2">
							<button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
								<svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
								</svg>
								<span>42 Likes</span>
							</button>
						</div>
						<button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
							<svg width="22px" height="22px" viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
								</g>
							</svg>
							<span>2 Comment</span>
						</button>
					</div>
				</div>
			</div>
		</div>









                    </div>
                    {/* <!-- End of Experience and education grid --> */}
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>




       </>
    )
}

export default Profile