import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from "@/Components/TableHeading";
import { useState } from 'react';

export default function Index({ auth, dokters, queryParams = null, success }) {

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('dokter.index'), queryParams)
    };
    const onKeyPress = (name, e) => {
        if (e.key !== 'enter') return;
        searchFieldChanged(name, e.target.value);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('dokter.index'), queryParams);
    };
    const deleteDokter = (dokter) => {
        if (!window.confirm("Are you sure you want to delete the dokter?")) {
            return;
        }
        router.delete(route("dokter.destroy", dokter.id));
    }

    const [antrianList, setAntrianList] = useState([]);
    const [lastNumber, setLastNumber] = useState(0);

    const addAntrian = () => {
        const newNumber = lastNumber + 1;
        const formattedNumber = `A-${String(newNumber).padStart(3, '0')}`;
        setAntrianList([...antrianList, formattedNumber]);
        setLastNumber(newNumber);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Dokter
                    </h2>
                    <Link
                        href={route("dokter.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Dokters" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                        <tr className='text-nowrap'>
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="nama"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Nama
                                            </TableHeading>
                                            <TableHeading
                                                name="jenis_layanan"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Jenis Layanan
                                            </TableHeading>
                                            <TableHeading
                                                name="jadwal"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Jadwal
                                            </TableHeading>
                                            <th className='px-3 py-3 text-right'>Action</th>
                                        </tr>
                                    </thead>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                        <tr className='text-nowrap'>
                                            <th className='px-3 py-3'></th>
                                            <th className='px-3 py-3'>
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.nama}
                                                    placeholder="Dokter Name"
                                                    onBlur={e =>
                                                        searchFieldChanged('nama', e.target.value)
                                                    }
                                                    onKeyPress={e => onKeyPress('nama', e)}
                                                />
                                            </th>
                                            <th className='px-3 py-3'>
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.jenis_layanan}
                                                    onBlur={e =>
                                                        searchFieldChanged('jenis_layanan', e.target.value)
                                                    }
                                                >
                                                    <option value="">Select Layanan</option>
                                                    <option value="poli_umum">Poli Umum</option>
                                                    <option value="poli_gigi">Poli Gigi</option>
                                                    <option value="khitan">Khitan</option>
                                                    <option value="bersalin">Bersalin</option>
                                                </SelectInput>
                                            </th>
                                            <th className='px-3 py-3'></th>
                                            <th className='px-3 py-3'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dokters.data.map((dokter) => (
                                            <tr key={dokter.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2">{dokter.id}</td>
                                                <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                    <Link href={route("dokter.show", dokter.id)}>
                                                        {dokter.nama}
                                                    </Link>
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[dokter.jenis_layanan]}
                                                    >
                                                        {PROJECT_STATUS_TEXT_MAP[dokter.jenis_layanan]}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-2 text-nowrap">{dokter.jadwal}</td>
                                                <td className="px-3 py-2 text-right">
                                                    <Link
                                                        href={route('dokter.edit', dokter.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteDokter(dokter)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={dokters.meta.links} />
                            </div>

                            <div className="mt-6">
                                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                    Sistem Antrian
                                </h2>
                                <button
                                    onClick={addAntrian}
                                    className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                                >
                                    Tambah Antrian
                                </button>
                                <ul className="list-disc pl-5">
                                    {antrianList.map((antrian, index) => (
                                        <li key={index} className="text-lg">{antrian}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
