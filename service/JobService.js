import axios from 'axios'

const COURSE_API_URL = 'http://localhost:3001';

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
        return axios.post(`${COURSE_API_URL}/jobs`, job);
    }
    retrieveJobByIndex(limit, skip, field, order) {
        if (field) {
            return axios.get(`${COURSE_API_URL}/jobs?filter[limit]=${limit}&filter[skip]=${skip}&filter[order][0]=${field}%20${order}`);
        }
        return axios.get(`${COURSE_API_URL}/jobs?filter[limit]=${limit}&filter[skip]=${skip}`);
    }
    retrieveSort(field, order, limit) {
        return axios.get(`${COURSE_API_URL}/jobs?filter[order][0]=${field}%20${order}&filter[limit]=${limit}`);
    }
    retrieveFilter(field, val) {
        return axios.get(`${COURSE_API_URL}/jobs? filter[where][${field}][like]=%25${val}`);
    }
}

export default new JobService()