<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DokterResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'jenis_layanan' => $this->jenis_layanan,
            'kehadiran' => $this->kehadiran,
            'jadwal' => $this->jadwal,
            'create_at' => (new Carbon($this->create_at))->format('Y-m-d'),
        ];
    }
}
