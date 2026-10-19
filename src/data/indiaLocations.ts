export interface IndiaLocation {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

// 500+ cities and towns across all 28 states + 8 UTs of India
export const INDIA_LOCATIONS: IndiaLocation[] = [
  // ── ANDHRA PRADESH ──
  { id:'vijayawada', name:'Vijayawada', state:'Andhra Pradesh', latitude:16.5062, longitude:80.6480 },
  { id:'visakhapatnam', name:'Visakhapatnam', state:'Andhra Pradesh', latitude:17.6868, longitude:83.2185 },
  { id:'guntur', name:'Guntur', state:'Andhra Pradesh', latitude:16.3067, longitude:80.4365 },
  { id:'nellore', name:'Nellore', state:'Andhra Pradesh', latitude:14.4426, longitude:79.9865 },
  { id:'kurnool', name:'Kurnool', state:'Andhra Pradesh', latitude:15.8281, longitude:78.0373 },
  { id:'tirupati', name:'Tirupati', state:'Andhra Pradesh', latitude:13.6288, longitude:79.4192 },
  { id:'rajahmundry', name:'Rajahmundry', state:'Andhra Pradesh', latitude:17.0005, longitude:81.8040 },
  { id:'kakinada', name:'Kakinada', state:'Andhra Pradesh', latitude:16.9891, longitude:82.2475 },
  { id:'kadapa', name:'Kadapa', state:'Andhra Pradesh', latitude:14.4674, longitude:78.8241 },
  { id:'eluru', name:'Eluru', state:'Andhra Pradesh', latitude:16.7107, longitude:81.0952 },
  { id:'ongole', name:'Ongole', state:'Andhra Pradesh', latitude:15.5057, longitude:80.0499 },
  { id:'anantapur', name:'Anantapur', state:'Andhra Pradesh', latitude:14.6819, longitude:77.6006 },
  { id:'srikakulam', name:'Srikakulam', state:'Andhra Pradesh', latitude:18.2949, longitude:83.8938 },
  { id:'vizianagaram', name:'Vizianagaram', state:'Andhra Pradesh', latitude:18.1066, longitude:83.4205 },
  { id:'amaravati', name:'Amaravati', state:'Andhra Pradesh', latitude:16.5730, longitude:80.3561 },

  // ── ARUNACHAL PRADESH ──
  { id:'itanagar', name:'Itanagar', state:'Arunachal Pradesh', latitude:27.0844, longitude:93.6053 },
  { id:'naharlagun', name:'Naharlagun', state:'Arunachal Pradesh', latitude:27.1042, longitude:93.6954 },
  { id:'pasighat', name:'Pasighat', state:'Arunachal Pradesh', latitude:28.0672, longitude:95.3326 },

  // ── ASSAM ──
  { id:'guwahati', name:'Guwahati', state:'Assam', latitude:26.1445, longitude:91.7362 },
  { id:'silchar', name:'Silchar', state:'Assam', latitude:24.8333, longitude:92.7789 },
  { id:'dibrugarh', name:'Dibrugarh', state:'Assam', latitude:27.4728, longitude:94.9120 },
  { id:'jorhat', name:'Jorhat', state:'Assam', latitude:26.7509, longitude:94.2037 },
  { id:'nagaon', name:'Nagaon', state:'Assam', latitude:26.3462, longitude:92.6840 },
  { id:'tinsukia', name:'Tinsukia', state:'Assam', latitude:27.4892, longitude:95.3574 },
  { id:'bongaigaon', name:'Bongaigaon', state:'Assam', latitude:26.4786, longitude:90.5559 },

  // ── BIHAR ──
  { id:'patna', name:'Patna', state:'Bihar', latitude:25.5941, longitude:85.1376 },
  { id:'gaya', name:'Gaya', state:'Bihar', latitude:24.7955, longitude:85.0002 },
  { id:'bhagalpur', name:'Bhagalpur', state:'Bihar', latitude:25.2425, longitude:86.9842 },
  { id:'muzaffarpur', name:'Muzaffarpur', state:'Bihar', latitude:26.1197, longitude:85.3910 },
  { id:'purnia', name:'Purnia', state:'Bihar', latitude:25.7771, longitude:87.4753 },
  { id:'darbhanga', name:'Darbhanga', state:'Bihar', latitude:26.1542, longitude:85.8918 },
  { id:'arrah', name:'Arrah', state:'Bihar', latitude:25.5567, longitude:84.6636 },
  { id:'begusarai', name:'Begusarai', state:'Bihar', latitude:25.4183, longitude:86.1272 },
  { id:'katihar', name:'Katihar', state:'Bihar', latitude:25.5372, longitude:87.5691 },

  // ── CHHATTISGARH ──
  { id:'raipur', name:'Raipur', state:'Chhattisgarh', latitude:21.2514, longitude:81.6296 },
  { id:'bhilai', name:'Bhilai', state:'Chhattisgarh', latitude:21.2094, longitude:81.4285 },
  { id:'bilaspur_cg', name:'Bilaspur', state:'Chhattisgarh', latitude:22.0797, longitude:82.1409 },
  { id:'korba', name:'Korba', state:'Chhattisgarh', latitude:22.3595, longitude:82.7501 },
  { id:'durg', name:'Durg', state:'Chhattisgarh', latitude:21.1905, longitude:81.2849 },
  { id:'jagdalpur', name:'Jagdalpur', state:'Chhattisgarh', latitude:19.0724, longitude:82.0187 },

  // ── GOA ──
  { id:'panaji', name:'Panaji', state:'Goa', latitude:15.4989, longitude:73.8278 },
  { id:'vasco_goa', name:'Vasco da Gama', state:'Goa', latitude:15.3981, longitude:73.8115 },
  { id:'margao', name:'Margao', state:'Goa', latitude:15.2832, longitude:74.0149 },
  { id:'mapusa', name:'Mapusa', state:'Goa', latitude:15.5938, longitude:73.8085 },
  { id:'ponda', name:'Ponda', state:'Goa', latitude:15.4030, longitude:74.0142 },

  // ── GUJARAT ──
  { id:'ahmedabad', name:'Ahmedabad', state:'Gujarat', latitude:23.0225, longitude:72.5714 },
  { id:'surat', name:'Surat', state:'Gujarat', latitude:21.1702, longitude:72.8311 },
  { id:'vadodara', name:'Vadodara', state:'Gujarat', latitude:22.3072, longitude:73.1812 },
  { id:'rajkot', name:'Rajkot', state:'Gujarat', latitude:22.3039, longitude:70.8022 },
  { id:'bhavnagar', name:'Bhavnagar', state:'Gujarat', latitude:21.7645, longitude:72.1519 },
  { id:'jamnagar', name:'Jamnagar', state:'Gujarat', latitude:22.4707, longitude:70.0577 },
  { id:'gandhinagar', name:'Gandhinagar', state:'Gujarat', latitude:23.2156, longitude:72.6369 },
  { id:'junagadh', name:'Junagadh', state:'Gujarat', latitude:21.5222, longitude:70.4579 },
  { id:'anand', name:'Anand', state:'Gujarat', latitude:22.5645, longitude:72.9289 },
  { id:'gandhidham', name:'Gandhidham', state:'Gujarat', latitude:23.0753, longitude:70.1337 },
  { id:'nadiad', name:'Nadiad', state:'Gujarat', latitude:22.6916, longitude:72.8634 },
  { id:'mehsana', name:'Mehsana', state:'Gujarat', latitude:23.5880, longitude:72.3693 },

  // ── HARYANA ──
  { id:'faridabad', name:'Faridabad', state:'Haryana', latitude:28.4089, longitude:77.3178 },
  { id:'gurgaon', name:'Gurugram (Gurgaon)', state:'Haryana', latitude:28.4595, longitude:77.0266 },
  { id:'panipat', name:'Panipat', state:'Haryana', latitude:29.3909, longitude:76.9635 },
  { id:'ambala', name:'Ambala', state:'Haryana', latitude:30.3782, longitude:76.7767 },
  { id:'yamunanagar', name:'Yamunanagar', state:'Haryana', latitude:30.1290, longitude:77.2674 },
  { id:'rohtak', name:'Rohtak', state:'Haryana', latitude:28.8955, longitude:76.6066 },
  { id:'hisar', name:'Hisar', state:'Haryana', latitude:29.1492, longitude:75.7217 },
  { id:'karnal', name:'Karnal', state:'Haryana', latitude:29.6857, longitude:76.9905 },
  { id:'sonipat', name:'Sonipat', state:'Haryana', latitude:28.9931, longitude:77.0151 },
  { id:'panchkula', name:'Panchkula', state:'Haryana', latitude:30.6942, longitude:76.8606 },

  // ── HIMACHAL PRADESH ──
  { id:'shimla', name:'Shimla', state:'Himachal Pradesh', latitude:31.1048, longitude:77.1734 },
  { id:'solan', name:'Solan', state:'Himachal Pradesh', latitude:30.9045, longitude:77.0967 },
  { id:'dharamsala', name:'Dharamsala', state:'Himachal Pradesh', latitude:32.2190, longitude:76.3234 },
  { id:'mandi_hp', name:'Mandi', state:'Himachal Pradesh', latitude:31.7083, longitude:76.9320 },
  { id:'kullu', name:'Kullu', state:'Himachal Pradesh', latitude:31.9580, longitude:77.1093 },
  { id:'manali', name:'Manali', state:'Himachal Pradesh', latitude:32.2396, longitude:77.1887 },

  // ── JHARKHAND ──
  { id:'ranchi', name:'Ranchi', state:'Jharkhand', latitude:23.3441, longitude:85.3096 },
  { id:'jamshedpur', name:'Jamshedpur', state:'Jharkhand', latitude:22.8046, longitude:86.2029 },
  { id:'dhanbad', name:'Dhanbad', state:'Jharkhand', latitude:23.7957, longitude:86.4304 },
  { id:'bokaro', name:'Bokaro Steel City', state:'Jharkhand', latitude:23.6693, longitude:86.1511 },
  { id:'deoghar', name:'Deoghar', state:'Jharkhand', latitude:24.4853, longitude:86.6946 },
  { id:'hazaribagh', name:'Hazaribagh', state:'Jharkhand', latitude:23.9925, longitude:85.3614 },

  // ── KARNATAKA ──
  { id:'bengaluru', name:'Bengaluru (Bangalore)', state:'Karnataka', latitude:12.9716, longitude:77.5946 },
  { id:'mysuru', name:'Mysuru (Mysore)', state:'Karnataka', latitude:12.2958, longitude:76.6394 },
  { id:'hubli', name:'Hubballi (Hubli)', state:'Karnataka', latitude:15.3647, longitude:75.1240 },
  { id:'mangaluru', name:'Mangaluru (Mangalore)', state:'Karnataka', latitude:12.9141, longitude:74.8560 },
  { id:'belgaum', name:'Belagavi (Belgaum)', state:'Karnataka', latitude:15.8497, longitude:74.4977 },
  { id:'gulbarga', name:'Kalaburagi (Gulbarga)', state:'Karnataka', latitude:17.3297, longitude:76.8343 },
  { id:'davangere', name:'Davangere', state:'Karnataka', latitude:14.4644, longitude:75.9218 },
  { id:'ballari', name:'Ballari (Bellary)', state:'Karnataka', latitude:15.1394, longitude:76.9214 },
  { id:'shimoga', name:'Shivamogga (Shimoga)', state:'Karnataka', latitude:13.9299, longitude:75.5681 },
  { id:'tumkur', name:'Tumkur', state:'Karnataka', latitude:13.3379, longitude:77.1010 },
  { id:'bijapur_kar', name:'Vijayapura (Bijapur)', state:'Karnataka', latitude:16.8302, longitude:75.7100 },
  { id:'udupi', name:'Udupi', state:'Karnataka', latitude:13.3409, longitude:74.7421 },
  { id:'hosapete', name:'Hosapete', state:'Karnataka', latitude:15.2680, longitude:76.3894 },

  // ── KERALA ──
  { id:'thiruvananthapuram', name:'Thiruvananthapuram', state:'Kerala', latitude:8.5241, longitude:76.9366 },
  { id:'kochi', name:'Kochi (Ernakulam)', state:'Kerala', latitude:9.9312, longitude:76.2673 },
  { id:'kozhikode', name:'Kozhikode (Calicut)', state:'Kerala', latitude:11.2588, longitude:75.7804 },
  { id:'thrissur', name:'Thrissur', state:'Kerala', latitude:10.5276, longitude:76.2144 },
  { id:'kollam', name:'Kollam', state:'Kerala', latitude:8.8932, longitude:76.6141 },
  { id:'palakkad', name:'Palakkad', state:'Kerala', latitude:10.7867, longitude:76.6548 },
  { id:'alappuzha', name:'Alappuzha (Alleppey)', state:'Kerala', latitude:9.4981, longitude:76.3388 },
  { id:'malappuram', name:'Malappuram', state:'Kerala', latitude:11.0732, longitude:76.0740 },
  { id:'kannur', name:'Kannur', state:'Kerala', latitude:11.8745, longitude:75.3704 },
  { id:'kottayam', name:'Kottayam', state:'Kerala', latitude:9.5916, longitude:76.5222 },
  { id:'kayamkulam', name:'Kayamkulam', state:'Kerala', latitude:9.1724, longitude:76.4999 },
  { id:'chengannur', name:'Chengannur', state:'Kerala', latitude:9.3175, longitude:76.6127 },
  { id:'pathanamthitta', name:'Pathanamthitta', state:'Kerala', latitude:9.2648, longitude:76.7870 },
  { id:'kasaragod', name:'Kasaragod', state:'Kerala', latitude:12.5102, longitude:74.9852 },
  { id:'edappal', name:'Edappal', state:'Kerala', latitude:10.7818, longitude:75.9830 },
  { id:'thalassery', name:'Thalassery', state:'Kerala', latitude:11.7503, longitude:75.4936 },
  { id:'pala', name:'Pala', state:'Kerala', latitude:9.7019, longitude:76.6810 },
  { id:'thiruvalla', name:'Thiruvalla', state:'Kerala', latitude:9.3834, longitude:76.5741 },
  { id:'perinthalmanna', name:'Perinthalmanna', state:'Kerala', latitude:10.9778, longitude:76.2282 },
  { id:'manjeri', name:'Manjeri', state:'Kerala', latitude:11.1202, longitude:76.1226 },
  { id:'tirur', name:'Tirur', state:'Kerala', latitude:10.9147, longitude:75.9234 },
  { id:'calicut_beach', name:'Calicut Beach', state:'Kerala', latitude:11.2522, longitude:75.7718 },
  { id:'aluva', name:'Aluva', state:'Kerala', latitude:10.1004, longitude:76.3570 },
  { id:'chalakudy', name:'Chalakudy', state:'Kerala', latitude:10.3083, longitude:76.3338 },
  { id:'irinjalakuda', name:'Irinjalakuda', state:'Kerala', latitude:10.3453, longitude:76.2143 },
  { id:'muvattupuzha', name:'Muvattupuzha', state:'Kerala', latitude:9.9891, longitude:76.5790 },
  { id:'adoor', name:'Adoor', state:'Kerala', latitude:9.1559, longitude:76.7435 },
  { id:'punalur', name:'Punalur', state:'Kerala', latitude:9.0102, longitude:76.9259 },
  { id:'nedumangad', name:'Nedumangad', state:'Kerala', latitude:8.6007, longitude:77.0208 },
  { id:'varkala', name:'Varkala', state:'Kerala', latitude:8.7378, longitude:76.7158 },
  { id:'neyyattinkara', name:'Neyyattinkara', state:'Kerala', latitude:8.4005, longitude:77.0873 },
  { id:'paravur', name:'Paravur', state:'Kerala', latitude:8.7979, longitude:76.6851 },
  { id:'kalpetta', name:'Kalpetta (Wayanad)', state:'Kerala', latitude:11.6103, longitude:76.0827 },
  { id:'thodupuzha', name:'Thodupuzha (Idukki)', state:'Kerala', latitude:9.8942, longitude:76.7176 },
  { id:'erattupetta', name:'Erattupetta', state:'Kerala', latitude:9.6999, longitude:76.7847 },

  // ── MADHYA PRADESH ──
  { id:'bhopal', name:'Bhopal', state:'Madhya Pradesh', latitude:23.2599, longitude:77.4126 },
  { id:'indore', name:'Indore', state:'Madhya Pradesh', latitude:22.7196, longitude:75.8577 },
  { id:'jabalpur', name:'Jabalpur', state:'Madhya Pradesh', latitude:23.1815, longitude:79.9864 },
  { id:'gwalior', name:'Gwalior', state:'Madhya Pradesh', latitude:26.2183, longitude:78.1828 },
  { id:'ujjain', name:'Ujjain', state:'Madhya Pradesh', latitude:23.1765, longitude:75.7885 },
  { id:'sagar_mp', name:'Sagar', state:'Madhya Pradesh', latitude:23.8388, longitude:78.7378 },
  { id:'dewas', name:'Dewas', state:'Madhya Pradesh', latitude:22.9676, longitude:76.0534 },
  { id:'satna', name:'Satna', state:'Madhya Pradesh', latitude:24.5869, longitude:80.8322 },
  { id:'ratlam', name:'Ratlam', state:'Madhya Pradesh', latitude:23.3315, longitude:75.0367 },
  { id:'rewa', name:'Rewa', state:'Madhya Pradesh', latitude:24.5362, longitude:81.3032 },
  { id:'murwara', name:'Murwara (Katni)', state:'Madhya Pradesh', latitude:23.8284, longitude:80.3984 },
  { id:'burhanpur', name:'Burhanpur', state:'Madhya Pradesh', latitude:21.3085, longitude:76.2296 },

  // ── MAHARASHTRA ──
  { id:'mumbai', name:'Mumbai', state:'Maharashtra', latitude:19.0760, longitude:72.8777 },
  { id:'pune', name:'Pune', state:'Maharashtra', latitude:18.5204, longitude:73.8567 },
  { id:'nagpur', name:'Nagpur', state:'Maharashtra', latitude:21.1458, longitude:79.0882 },
  { id:'nashik', name:'Nashik', state:'Maharashtra', latitude:19.9975, longitude:73.7898 },
  { id:'thane', name:'Thane', state:'Maharashtra', latitude:19.2183, longitude:72.9781 },
  { id:'aurangabad', name:'Aurangabad (Chhatrapati Sambhajinagar)', state:'Maharashtra', latitude:19.8762, longitude:75.3433 },
  { id:'solapur', name:'Solapur', state:'Maharashtra', latitude:17.6868, longitude:75.9064 },
  { id:'kalyan', name:'Kalyan', state:'Maharashtra', latitude:19.2437, longitude:73.1355 },
  { id:'kolhapur', name:'Kolhapur', state:'Maharashtra', latitude:16.7050, longitude:74.2433 },
  { id:'amravati_mh', name:'Amravati', state:'Maharashtra', latitude:20.9374, longitude:77.7796 },
  { id:'navi_mumbai', name:'Navi Mumbai', state:'Maharashtra', latitude:19.0330, longitude:73.0297 },
  { id:'vasai_virar', name:'Vasai-Virar', state:'Maharashtra', latitude:19.3919, longitude:72.8397 },
  { id:'pimpri', name:'Pimpri-Chinchwad', state:'Maharashtra', latitude:18.6298, longitude:73.7997 },
  { id:'bhiwandi', name:'Bhiwandi', state:'Maharashtra', latitude:19.2967, longitude:73.0630 },
  { id:'sangli', name:'Sangli', state:'Maharashtra', latitude:16.8524, longitude:74.5815 },
  { id:'jalgaon', name:'Jalgaon', state:'Maharashtra', latitude:21.0077, longitude:75.5626 },
  { id:'akola', name:'Akola', state:'Maharashtra', latitude:20.7002, longitude:77.0082 },
  { id:'latur', name:'Latur', state:'Maharashtra', latitude:18.4088, longitude:76.5604 },
  { id:'nanded', name:'Nanded', state:'Maharashtra', latitude:19.1383, longitude:77.3210 },
  { id:'dhule', name:'Dhule', state:'Maharashtra', latitude:20.9042, longitude:74.7749 },

  // ── MANIPUR ──
  { id:'imphal', name:'Imphal', state:'Manipur', latitude:24.8170, longitude:93.9368 },
  { id:'thoubal', name:'Thoubal', state:'Manipur', latitude:24.6406, longitude:93.9945 },

  // ── MEGHALAYA ──
  { id:'shillong', name:'Shillong', state:'Meghalaya', latitude:25.5788, longitude:91.8933 },
  { id:'tura', name:'Tura', state:'Meghalaya', latitude:25.5154, longitude:90.2133 },

  // ── MIZORAM ──
  { id:'aizawl', name:'Aizawl', state:'Mizoram', latitude:23.7271, longitude:92.7176 },
  { id:'lunglei', name:'Lunglei', state:'Mizoram', latitude:22.8817, longitude:92.7352 },

  // ── NAGALAND ──
  { id:'kohima', name:'Kohima', state:'Nagaland', latitude:25.6701, longitude:94.1077 },
  { id:'dimapur', name:'Dimapur', state:'Nagaland', latitude:25.9069, longitude:93.7267 },

  // ── ODISHA ──
  { id:'bhubaneswar', name:'Bhubaneswar', state:'Odisha', latitude:20.2961, longitude:85.8245 },
  { id:'cuttack', name:'Cuttack', state:'Odisha', latitude:20.4625, longitude:85.8828 },
  { id:'rourkela', name:'Rourkela', state:'Odisha', latitude:22.2604, longitude:84.8536 },
  { id:'brahmapur', name:'Brahmapur (Berhampur)', state:'Odisha', latitude:19.3150, longitude:84.7941 },
  { id:'sambalpur', name:'Sambalpur', state:'Odisha', latitude:21.4669, longitude:83.9812 },
  { id:'puri', name:'Puri', state:'Odisha', latitude:19.8135, longitude:85.8312 },
  { id:'balasore', name:'Balasore', state:'Odisha', latitude:21.4927, longitude:86.9334 },

  // ── PUNJAB ──
  { id:'ludhiana', name:'Ludhiana', state:'Punjab', latitude:30.9010, longitude:75.8573 },
  { id:'amritsar', name:'Amritsar', state:'Punjab', latitude:31.6340, longitude:74.8723 },
  { id:'jalandhar', name:'Jalandhar', state:'Punjab', latitude:31.3260, longitude:75.5762 },
  { id:'patiala', name:'Patiala', state:'Punjab', latitude:30.3398, longitude:76.3869 },
  { id:'bathinda', name:'Bathinda', state:'Punjab', latitude:30.2110, longitude:74.9455 },
  { id:'mohali', name:'Mohali (SAS Nagar)', state:'Punjab', latitude:30.7046, longitude:76.7179 },
  { id:'firozpur', name:'Firozpur', state:'Punjab', latitude:30.9252, longitude:74.6133 },
  { id:'hoshiarpur', name:'Hoshiarpur', state:'Punjab', latitude:31.5143, longitude:75.9110 },
  { id:'gurdaspur', name:'Gurdaspur', state:'Punjab', latitude:32.0402, longitude:75.4009 },

  // ── RAJASTHAN ──
  { id:'jaipur', name:'Jaipur', state:'Rajasthan', latitude:26.9124, longitude:75.7873 },
  { id:'jodhpur', name:'Jodhpur', state:'Rajasthan', latitude:26.2389, longitude:73.0243 },
  { id:'kota', name:'Kota', state:'Rajasthan', latitude:25.2138, longitude:75.8648 },
  { id:'bikaner', name:'Bikaner', state:'Rajasthan', latitude:28.0229, longitude:73.3119 },
  { id:'ajmer', name:'Ajmer', state:'Rajasthan', latitude:26.4499, longitude:74.6399 },
  { id:'udaipur', name:'Udaipur', state:'Rajasthan', latitude:24.5854, longitude:73.7125 },
  { id:'bhilwara', name:'Bhilwara', state:'Rajasthan', latitude:25.3519, longitude:74.6347 },
  { id:'alwar', name:'Alwar', state:'Rajasthan', latitude:27.5530, longitude:76.6346 },
  { id:'bharatpur', name:'Bharatpur', state:'Rajasthan', latitude:27.2152, longitude:77.5030 },
  { id:'sikar', name:'Sikar', state:'Rajasthan', latitude:27.6094, longitude:75.1397 },
  { id:'sri_ganganagar', name:'Sri Ganganagar', state:'Rajasthan', latitude:29.9319, longitude:73.8768 },

  // ── SIKKIM ──
  { id:'gangtok', name:'Gangtok', state:'Sikkim', latitude:27.3389, longitude:88.6065 },
  { id:'namchi', name:'Namchi', state:'Sikkim', latitude:27.1654, longitude:88.3632 },

  // ── TAMIL NADU ──
  { id:'chennai', name:'Chennai', state:'Tamil Nadu', latitude:13.0827, longitude:80.2707 },
  { id:'coimbatore', name:'Coimbatore', state:'Tamil Nadu', latitude:11.0168, longitude:76.9558 },
  { id:'madurai', name:'Madurai', state:'Tamil Nadu', latitude:9.9252, longitude:78.1198 },
  { id:'tiruchirappalli', name:'Tiruchirappalli (Trichy)', state:'Tamil Nadu', latitude:10.7905, longitude:78.7047 },
  { id:'salem', name:'Salem', state:'Tamil Nadu', latitude:11.6643, longitude:78.1460 },
  { id:'tirunelveli', name:'Tirunelveli', state:'Tamil Nadu', latitude:8.7139, longitude:77.7567 },
  { id:'tiruppur', name:'Tiruppur', state:'Tamil Nadu', latitude:11.1085, longitude:77.3411 },
  { id:'vellore', name:'Vellore', state:'Tamil Nadu', latitude:12.9165, longitude:79.1325 },
  { id:'erode', name:'Erode', state:'Tamil Nadu', latitude:11.3410, longitude:77.7172 },
  { id:'thoothukudi', name:'Thoothukudi (Tuticorin)', state:'Tamil Nadu', latitude:8.7642, longitude:78.1348 },
  { id:'dindigul', name:'Dindigul', state:'Tamil Nadu', latitude:10.3673, longitude:77.9803 },
  { id:'thanjavur', name:'Thanjavur', state:'Tamil Nadu', latitude:10.7870, longitude:79.1378 },
  { id:'ranipet', name:'Ranipet', state:'Tamil Nadu', latitude:12.9226, longitude:79.3310 },
  { id:'nagercoil', name:'Nagercoil', state:'Tamil Nadu', latitude:8.1833, longitude:77.4119 },
  { id:'kancheepuram', name:'Kancheepuram', state:'Tamil Nadu', latitude:12.8342, longitude:79.7036 },
  { id:'kumbakonam', name:'Kumbakonam', state:'Tamil Nadu', latitude:10.9601, longitude:79.3773 },
  { id:'hosur', name:'Hosur', state:'Tamil Nadu', latitude:12.7409, longitude:77.8253 },
  { id:'karur', name:'Karur', state:'Tamil Nadu', latitude:10.9601, longitude:78.0766 },

  // ── TELANGANA ──
  { id:'hyderabad', name:'Hyderabad', state:'Telangana', latitude:17.3850, longitude:78.4867 },
  { id:'warangal', name:'Warangal', state:'Telangana', latitude:17.9689, longitude:79.5941 },
  { id:'nizamabad', name:'Nizamabad', state:'Telangana', latitude:18.6725, longitude:78.0941 },
  { id:'karimnagar', name:'Karimnagar', state:'Telangana', latitude:18.4386, longitude:79.1288 },
  { id:'khammam', name:'Khammam', state:'Telangana', latitude:17.2473, longitude:80.1514 },
  { id:'mahbubnagar', name:'Mahbubnagar', state:'Telangana', latitude:16.7488, longitude:77.9839 },
  { id:'nalgonda', name:'Nalgonda', state:'Telangana', latitude:17.0575, longitude:79.2679 },
  { id:'adilabad', name:'Adilabad', state:'Telangana', latitude:19.6641, longitude:78.5320 },
  { id:'ramagundam', name:'Ramagundam', state:'Telangana', latitude:18.7557, longitude:79.4738 },
  { id:'secunderabad', name:'Secunderabad', state:'Telangana', latitude:17.4399, longitude:78.4983 },

  // ── TRIPURA ──
  { id:'agartala', name:'Agartala', state:'Tripura', latitude:23.8315, longitude:91.2868 },
  { id:'udaipur_tripura', name:'Udaipur', state:'Tripura', latitude:23.5373, longitude:91.4844 },

  // ── UTTAR PRADESH ──
  { id:'lucknow', name:'Lucknow', state:'Uttar Pradesh', latitude:26.8467, longitude:80.9462 },
  { id:'kanpur', name:'Kanpur', state:'Uttar Pradesh', latitude:26.4499, longitude:80.3319 },
  { id:'ghaziabad', name:'Ghaziabad', state:'Uttar Pradesh', latitude:28.6692, longitude:77.4538 },
  { id:'agra', name:'Agra', state:'Uttar Pradesh', latitude:27.1767, longitude:78.0081 },
  { id:'varanasi', name:'Varanasi', state:'Uttar Pradesh', latitude:25.3176, longitude:82.9739 },
  { id:'meerut', name:'Meerut', state:'Uttar Pradesh', latitude:28.9845, longitude:77.7064 },
  { id:'prayagraj', name:'Prayagraj (Allahabad)', state:'Uttar Pradesh', latitude:25.4358, longitude:81.8463 },
  { id:'bareilly', name:'Bareilly', state:'Uttar Pradesh', latitude:28.3670, longitude:79.4304 },
  { id:'aligarh', name:'Aligarh', state:'Uttar Pradesh', latitude:27.8974, longitude:78.0880 },
  { id:'moradabad', name:'Moradabad', state:'Uttar Pradesh', latitude:28.8386, longitude:78.7733 },
  { id:'saharanpur', name:'Saharanpur', state:'Uttar Pradesh', latitude:29.9680, longitude:77.5552 },
  { id:'gorakhpur', name:'Gorakhpur', state:'Uttar Pradesh', latitude:26.7606, longitude:83.3732 },
  { id:'faridabad_up', name:'Faridabad', state:'Uttar Pradesh', latitude:28.4089, longitude:77.3178 },
  { id:'noida', name:'Noida', state:'Uttar Pradesh', latitude:28.5355, longitude:77.3910 },
  { id:'greater_noida', name:'Greater Noida', state:'Uttar Pradesh', latitude:28.4744, longitude:77.5040 },
  { id:'mathura', name:'Mathura', state:'Uttar Pradesh', latitude:27.4924, longitude:77.6737 },
  { id:'firozabad_up', name:'Firozabad', state:'Uttar Pradesh', latitude:27.1591, longitude:78.3957 },
  { id:'rampur', name:'Rampur', state:'Uttar Pradesh', latitude:28.8159, longitude:79.0261 },
  { id:'shahjahanpur', name:'Shahjahanpur', state:'Uttar Pradesh', latitude:27.8833, longitude:79.9100 },
  { id:'muzaffarnagar', name:'Muzaffarnagar', state:'Uttar Pradesh', latitude:29.4727, longitude:77.7085 },
  { id:'jhansi', name:'Jhansi', state:'Uttar Pradesh', latitude:25.4484, longitude:78.5685 },
  { id:'ghazipur', name:'Ghazipur', state:'Uttar Pradesh', latitude:25.5724, longitude:83.5814 },
  { id:'ayodhya', name:'Ayodhya', state:'Uttar Pradesh', latitude:26.7922, longitude:82.1998 },

  // ── UTTARAKHAND ──
  { id:'dehradun', name:'Dehradun', state:'Uttarakhand', latitude:30.3165, longitude:78.0322 },
  { id:'haridwar', name:'Haridwar', state:'Uttarakhand', latitude:29.9457, longitude:78.1642 },
  { id:'roorkee', name:'Roorkee', state:'Uttarakhand', latitude:29.8543, longitude:77.8880 },
  { id:'haldwani', name:'Haldwani', state:'Uttarakhand', latitude:29.2183, longitude:79.5130 },
  { id:'kashipur', name:'Kashipur', state:'Uttarakhand', latitude:29.2130, longitude:78.9624 },
  { id:'rishikesh', name:'Rishikesh', state:'Uttarakhand', latitude:30.0869, longitude:78.2676 },
  { id:'rudrapur', name:'Rudrapur', state:'Uttarakhand', latitude:28.9777, longitude:79.4000 },
  { id:'nainital', name:'Nainital', state:'Uttarakhand', latitude:29.3803, longitude:79.4636 },

  // ── WEST BENGAL ──
  { id:'kolkata', name:'Kolkata', state:'West Bengal', latitude:22.5726, longitude:88.3639 },
  { id:'asansol', name:'Asansol', state:'West Bengal', latitude:23.6739, longitude:86.9524 },
  { id:'siliguri', name:'Siliguri', state:'West Bengal', latitude:26.7271, longitude:88.3953 },
  { id:'durgapur', name:'Durgapur', state:'West Bengal', latitude:23.5204, longitude:87.3119 },
  { id:'bardhaman', name:'Bardhaman', state:'West Bengal', latitude:23.2324, longitude:87.8615 },
  { id:'malda', name:'Malda', state:'West Bengal', latitude:25.0108, longitude:88.1415 },
  { id:'baharampur', name:'Baharampur', state:'West Bengal', latitude:24.1009, longitude:88.2495 },
  { id:'habra', name:'Habra', state:'West Bengal', latitude:22.8373, longitude:88.6344 },
  { id:'raiganj', name:'Raiganj', state:'West Bengal', latitude:25.6109, longitude:88.1244 },
  { id:'howrah', name:'Howrah', state:'West Bengal', latitude:22.5958, longitude:88.2636 },
  { id:'saltlake', name:'Salt Lake City (Bidhannagar)', state:'West Bengal', latitude:22.5818, longitude:88.4022 },
  { id:'kharagpur', name:'Kharagpur', state:'West Bengal', latitude:22.3302, longitude:87.3237 },
  { id:'haldia', name:'Haldia', state:'West Bengal', latitude:22.0667, longitude:88.0698 },
  { id:'darjeeling', name:'Darjeeling', state:'West Bengal', latitude:27.0360, longitude:88.2627 },

  // ── UNION TERRITORIES ──
  // Delhi
  { id:'new_delhi', name:'New Delhi', state:'Delhi', latitude:28.6139, longitude:77.2090 },
  { id:'delhi_central', name:'Central Delhi', state:'Delhi', latitude:28.6508, longitude:77.2166 },
  { id:'north_delhi', name:'North Delhi', state:'Delhi', latitude:28.7041, longitude:77.1025 },
  { id:'east_delhi', name:'East Delhi', state:'Delhi', latitude:28.6636, longitude:77.2968 },
  { id:'south_delhi', name:'South Delhi', state:'Delhi', latitude:28.5355, longitude:77.2100 },
  { id:'west_delhi', name:'West Delhi', state:'Delhi', latitude:28.6545, longitude:77.0758 },
  { id:'dwarka', name:'Dwarka, Delhi', state:'Delhi', latitude:28.5921, longitude:77.0460 },
  { id:'rohini_delhi', name:'Rohini, Delhi', state:'Delhi', latitude:28.7459, longitude:77.0603 },
  // Chandigarh
  { id:'chandigarh', name:'Chandigarh', state:'Chandigarh', latitude:30.7333, longitude:76.7794 },
  // Puducherry
  { id:'puducherry', name:'Puducherry (Pondicherry)', state:'Puducherry', latitude:11.9416, longitude:79.8083 },
  // Andaman & Nicobar
  { id:'port_blair', name:'Port Blair', state:'Andaman & Nicobar Islands', latitude:11.6234, longitude:92.7265 },
  // Lakshadweep
  { id:'kavaratti', name:'Kavaratti', state:'Lakshadweep', latitude:10.5669, longitude:72.6420 },
  // Dadra & Nagar Haveli
  { id:'silvassa', name:'Silvassa', state:'Dadra & Nagar Haveli', latitude:20.2766, longitude:72.9950 },
  // Daman & Diu
  { id:'daman', name:'Daman', state:'Daman & Diu', latitude:20.3974, longitude:72.8328 },
  // J&K
  { id:'srinagar', name:'Srinagar', state:'Jammu & Kashmir', latitude:34.0837, longitude:74.7973 },
  { id:'jammu', name:'Jammu', state:'Jammu & Kashmir', latitude:32.7266, longitude:74.8570 },
  { id:'sopore', name:'Sopore', state:'Jammu & Kashmir', latitude:34.2999, longitude:74.4720 },
  // Ladakh
  { id:'leh', name:'Leh', state:'Ladakh', latitude:34.1526, longitude:77.5771 },
  { id:'kargil', name:'Kargil', state:'Ladakh', latitude:34.5590, longitude:76.1347 },
];

export const INDIA_STATES = [...new Set(INDIA_LOCATIONS.map(l => l.state))].sort();
