import React from 'react';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import JobListing from './JobListing';
function JobListings({ isHome = false, }) {
    // const jobsListing = isHome ? jobs.slice(0, 3) : jobs;
    const [jobs, setJobs] = useState([]); // empty array when we request, and then fill it once we request
    const [loading, setLoading] = useState(true);

    // takes a funcction and a and dependency array
    // if put name, then everytime name changes then this will run 
    // if no empty array, then its forever loop
    useEffect(() => {
        const apiUrl = isHome ? 'http://localhost:8000/jobs?_limit=3' : 'http://localhost:8000/jobs'
        const fetchJobs = async () => {
            try {
                const res = await fetch(apiUrl)
                const data = await res.json();
                setJobs(data)
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                // it will run either way if fail or not
                setLoading(false);
            }

        };
        fetchJobs();
    }, []);


    return (
        <div>
            <section className="bg-blue-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                    </h2>
                    {loading ? <Spinner loading={loading} /> :
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))}
                        </div>}
                </div>
            </section>
        </div>
    );
}

export default JobListings;
