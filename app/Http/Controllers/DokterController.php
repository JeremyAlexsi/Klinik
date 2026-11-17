<?php

namespace App\Http\Controllers;

use App\Models\dokter;
use App\Http\Requests\StoredokterRequest;
use App\Http\Requests\UpdatedokterRequest;
use App\Http\Resources\DokterResource;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = dokter::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("nama")){
            $query->where("nama", "like", "%" . request("nama") . "%");
        }

        if (request("jenis_layanan")){
            $query->where("jenis_layanan", request("jenis_layanan"));
        }

        $dokters = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);

        return inertia("Dokter/Index", [
            "dokters" => DokterResource::collection($dokters),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
        //
    }

    public function board()
    {
        $query = dokter::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("nama")){
            $query->where("nama", "like", "%" . request("nama") . "%");
        }

        if (request("jenis_layanan")){
            $query->where("jenis_layanan", request("jenis_layanan"));
        }

        $dokters = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);

        return inertia("Board", [
            "dokters" => DokterResource::collection($dokters),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
        //
    }

    public function board2()
    {
        $query = dokter::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("nama")){
            $query->where("nama", "like", "%" . request("nama") . "%");
        }

        if (request("jenis_layanan")){
            $query->where("jenis_layanan", request("jenis_layanan"));
        }

        $dokters = $query->orderBy($sortField, $sortDirection)
        ->paginate(10);

        return inertia("Board2", [
            "dokters" => DokterResource::collection($dokters),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Dokter/Create");
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoredokterRequest $request)
    {
        $data = $request->validated();
        Dokter::create($data);

        return to_route('dokter.index')
        ->with('success', 'Dokter was created');
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(dokter $dokter)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(dokter $dokter)
    {
        return inertia('Dokter/Edit', [
            'dokter' => new DokterResource($dokter),
        ]);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatedokterRequest $request, dokter $dokter)
    {
        $nama = $dokter->nama;
        $data = $request->validated();
        $dokter->update($data);
        return to_route('dokter.index')
        ->with('success', "Dokter \"$nama\" was updated");
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(dokter $dokter)
    {
        $nama = $dokter->nama;
        $dokter->delete();
        return to_route('dokter.index')
        ->with('success', "Dokter \"$nama\" was deleted");
        //
    }
}
