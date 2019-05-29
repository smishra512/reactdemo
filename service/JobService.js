import axios from 'axios'

const COURSE_API_URL = 'http://localhost:3000';

class JobService {

    retrieveAllJob() {
        return axios.get(`${COURSE_API_URL}/jobs`);
    }
    retrieveCount() {
        return axios.get(`${COURSE_API_URL}/jobs/count`);
    }

    retrieveJob(id) {
        return axios.get(`${COURSE_API_URL}/jobs/${id}`);
    }

    deleteJob(id) {
        return axios.delete(`${COURSE_API_URL}/jobs/${id}`);
    }

    updateJob(id, job) {
        return axios.put(`${COURSE_API_URL}/jobs/${id}`, job);
    }

    createJob(job) {
        //console.log('executed service')
        return axios.post(`${COURSE_API_URL}/jobs`, job);
    }
    retrieveJobByIndex(limit,skip) {
        alert(`${COURSE_API_URL}/jobs?filter[limit]=${limit}&filter[skip]=${skip}`);
        return axios.get(`${COURSE_API_URL}/jobs?filter[limit]=${limit}&filter[skip]=${skip}`);
    }
}

export default new JobService()