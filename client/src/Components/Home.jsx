import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [status1, setStatus1] = useState("");
    const [status2, setStatus2] = useState("");
    const [status3, setStatus3] = useState("");
    const [time1, setTime1] = useState("");
    const [time2, setTime2] = useState("");
    const [time3, setTime3] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [type3, setType3] = useState("");

    const getDataType = (array) => {
        if (array.every(item => !isNaN(Number(item)))) {
            if (array.every(item => Number.isInteger(Number(item)))) {
                return 'Integer';
            } else {
                return 'Float';
            }
        } else {
            return 'String';
        }
    };

    const checkSorted = (input) => {
        let array = input.split(',').map(item => item.trim());
        const type = getDataType(array);

        if (type === 'Integer' || type === 'Float') {
            array = array.map(Number);
        }

        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                return { isSorted: false, type: type };
            }
        }
        return { isSorted: true, type: type };
    };

    const handleSubmit = async () => {
        const startTime = performance.now();

        const result1 = checkSorted(input1);
        const result2 = checkSorted(input2);
        const result3 = checkSorted(input3);

        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);

        setStatus1(result1.isSorted ? "Pass" : "Fail");
        setStatus2(result2.isSorted ? "Pass" : "Fail");
        setStatus3(result3.isSorted ? "Pass" : "Fail");

        setTime1(totalTime + " seconds");
        setTime2(totalTime + " seconds");
        setTime3(totalTime + " seconds");

        setType1(result1.type);
        setType2(result2.type);
        setType3(result3.type);

        const now = new Date().toLocaleTimeString();
        setLastUpdated(now);

        const data = {
            test_cases: [
                {
                    input: input1,
                    status: status1,
                    time: totalTime,
                    type: result1.type
                },
                {
                    input: input2,
                    status: status2,
                    time: totalTime,
                    type: result2.type
                },
                {
                    input: input3,
                    status: status3,
                    time: totalTime,
                    type: result3.type
                }
            ],
            last_updated: now
        };

        try {
            await axios.post('http://localhost:5000/submit', data);
            alert('Data successfully sent to the backend!');
        } catch (error) {
            console.error('There was an error sending the data!', error);
        }
    };

    return (
        <div className='w-full h-screen bg-[#00193c] text-slate-100 overflow-hidden'>
            <div className='w-full h-10 border-b border-b-[3px] border-slate-100 py-1 px-4'>
                <h1 className='text-xl font-bold'>Test Case App</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='searchBox bg-[#002864] flex rounded m-1 h-10'>
                    <input type="text" className='bg-[#002864] p-2 rounded m-3 w-[450px]' placeholder='Search Issues' />
                    <span className="material-symbols-outlined my-auto p-2 bg-[#e64ba0] rounded">search</span>
                </div>
                <div className='Main container h-[1000px] w-[1200px] p-5'>
                    <pre className='flex items-center justify-center text-lg'><strong>Question:</strong> Check if the given array is in ascending order or not</pre>
                    <div className='FilterContainer flex text-lg bg-[#002864] p-1 w-[90px] rounded mx-3'>
                        <p>Filter</p>
                        <span className="material-symbols-outlined">filter_alt</span>
                    </div>
                    <div className='BigBox border border-[3px] border-slate-100 h-[500px] flex'>
                        <div className='TestCase w-[355px] flex flex-col mx-auto'>
                            <p className='bg-[#002864] w-full p-2 text-xl flex justify-center items-center'>Test Case</p>
                            <div className='row1 px-5 py-3'>
                                <p>Test Case ID</p>
                                <div className='h-[100px] bg-[#002864] p-1'>
                                    <input type="text" className='w-full h-[70px] bg-[#002864] p-2 flex' onChange={(e) => { setInput1(e.target.value) }} placeholder='Enter data separated by commas Ex: 9,8,2,4,6' />
                                    <p>Last Updated: {lastUpdated}</p>
                                </div>
                            </div>
                            <div className='row1 px-5 py-3'>
                                <p>Test Case ID</p>
                                <div className='h-[100px] bg-[#002864] p-1'>
                                    <input type="text" className='w-full h-[70px] bg-[#002864]' onChange={(e) => { setInput2(e.target.value) }} />
                                    <p>Last Updated: {lastUpdated}</p>
                                </div>
                            </div>
                            <div className='row1 px-5 py-3'>
                                <p>Test Case ID</p>
                                <div className='h-[100px] bg-[#002864] p-1'>
                                    <input type="text" className='w-full h-[70px] bg-[#002864]' onChange={(e) => { setInput3(e.target.value) }} />
                                    <p>Last Updated: {lastUpdated}</p>
                                </div>
                            </div>
                        </div>
                        <div className='Estimate Time w-[200px] flex flex-col items-center'>
                            <p className='bg-[#002864] w-full p-2 text-lg flex justify-center items-center'>Estimated Time</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{time1}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{time2}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{time3}</p>
                        </div>
                        <div className='Estimate Time w-[200px] flex flex-col items-center'>
                            <p className='bg-[#002864] w-full p-2 text-lg flex justify-center items-center'>Data Type</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{type1}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{type2}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{type3}</p>
                        </div>
                        <div className='Estimate Time w-[200px] flex flex-col items-center'>
                            <p className='bg-[#002864] w-full p-2 text-lg flex justify-center items-center'>Result Description</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{status1 === "Pass" ? "Array is sorted" : "Array is not sorted"}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{status2 === "Pass" ? "Array is sorted" : "Array is not sorted"}</p>
                            <p className='h-[130px] p-1 flex justify-center items-end'>{status3 === "Pass" ? "Array is sorted" : "Array is not sorted"}</p>
                        </div>
                        <div className='Estimate Time w-[200px] flex flex-col items-center'>
                            <p className='bg-[#002864] w-full p-2 text-lg flex justify-center items-center'>Status</p>
                            <div className='h-[130px] p-1 flex justify-center items-end'>
                                <select className='bg-[#002864] p-2 rounded' name="Select" value={status1}>
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                            <div className='h-[130px] p-1 flex justify-center items-end'>
                                <select className='bg-[#002864] p-2 rounded' name="Select" value={status2}>
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                            <div className='h-[130px] p-1 flex justify-center items-end'>
                                <select className='bg-[#002864] p-2 rounded' name="Select" value={status3}>
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#e64ba0] h-8 p-2 w-[100px] flex items-center justify-center mx-auto my-1 rounded hover:w-[120px] hover:h-9'>
                        <button className='font-bold' onClick={handleSubmit}>Check</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
