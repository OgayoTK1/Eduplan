async function fetchData() {
  const skill = document.getElementById('skillInput').value;
  if (!skill) {
    alert('Please enter a skill.');
    return;
  }

  try {
    const [jobsResponse, coursesResponse] = await Promise.all([
      fetch(`/api/jobs?skill=${skill}`),
      fetch(`/api/courses?skill=${skill}`)
    ]);

    const jobs = await jobsResponse.json();
    const courses = await coursesResponse.json();

    displayJobs(jobs);
    displayCourses(courses);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayJobs(jobs) {
  const jobsList = document.getElementById('jobsList');
  jobsList.innerHTML = '';
  jobs.forEach(job => {
    const listItem = document.createElement('li');
    listItem.textContent = `${job.employer_name}: ${job.job_title} (${job.job_city}, ${job.job_country})`;
    jobsList.appendChild(listItem);
  });
}

function displayCourses(courses) {
  const coursesList = document.getElementById('coursesList');
  coursesList.innerHTML = '';
  courses.forEach(course => {
    const listItem = document.createElement('li');
    listItem.textContent = course.name;
    coursesList.appendChild(listItem);
  });
}

