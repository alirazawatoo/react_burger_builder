import axios from 'axios';


const instances = axios.create({
	baseURL: 'https://burger-labz.firebaseio.com/'
});

export default instances;