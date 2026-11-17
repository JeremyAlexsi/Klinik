<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatedokterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nama" => ['required', 'max:255'],
            "jadwal" => ['nullable', 'string'],
            "jenis_layanan" => ['required', Rule::in([
                'poli_umum', 'poli_gigi', 'khitan', 'bersalin'
            ])],
            "kehadiran" => ['required', Rule::in([
                 'ada', 'tidak_ada'
            ])],
            //
        ];
    }
}
