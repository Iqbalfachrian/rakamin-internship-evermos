import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

export function handleSummary(data) {
    return {
      "put.html": htmlReport(data),
    };
  }


export default function () {
    const res = http.put('https://reqres.in/api/users/2');
    const payload = JSON.stringify({
        name: 'Morpheus',
        job: 'Zion Resident'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const checkOutput = check(
        res,
        {
            'response code was 200': (res) => res.status == 200,
        }
    )
}