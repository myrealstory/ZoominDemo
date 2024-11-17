export const JobArray = () => {
    const jobs = [
        {
            id: 1,
            title: "jobtitle",
            company: "WAION",
            startDate: "2024-06-01",
            endDate: "nows",
            description: "jobDesc1",
            project: "project1",
        },
        {
            id: 2,
            title: "jobtitle",
            company: "RingusSolution",
            startDate: "2022-09-01",
            endDate: "2024-05-31",
            description: "jobDesc2",
            project: "project2",
        },
        {
            id: 3,
            title: "designJob",
            company: "AMG",
            startDate: "2020-12-01",
            endDate: "2021-10-31",
            description: "jobDesc3",
            project: `<li></li>`,
        },
    ];

    return jobs;
}