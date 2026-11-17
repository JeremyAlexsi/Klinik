import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }){
    const { data, setData, post, errors, reset } = useForm({
        nama: '',
        jenis_layanan: '',
        jadwal: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('dokter.store'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new Dokter</h2>}
        >
            <Head title="Dokters" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="mt-4">
                                <InputLabel htmlFor="dokter_nama" value="Dokter Nama" />
                                <TextInput id="dokter_nama" type="text" name="nama"
                                value ={data.nama} className="mt-1 block w-full"
                                onChange={(e) => setData('nama', e.target.value)} />
                                <InputError message={errors.nama} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="dokter_jadwal" value="Jadwal" />
                                <TextInput id="dokter_jadwal" type="text" name="jadwal"
                                value ={data.jadwal} className="mt-1 block w-full"
                                onChange={(e) => setData('jadwal', e.target.value)} />
                                <InputError message={errors.jadwal} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="dokter_jenis_layanan" value="Jenis Layanan" />
                                <SelectInput
                                    name="jenis_layanan" id="dokter_jenis_layanan" className="mt-1 block w-full"
                                    onChange={(e) => setData('jenis_layanan', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="poli_umum">Poli Umum</option>
                                    <option value="poli_gigi">Poli Gigi</option>
                                    <option value="khitan">Khitan</option>
                                    <option value="bersalin">Bersalin</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('dokter.index')} className="bg-gray-100 py-1 px-3 text-gray-800
                                rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white
                                rounded shadow transition-all hover:bg-gray-200 mr-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
