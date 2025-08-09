<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
//            'id' => ['required', 'integer', Rule::exists('users', 'id')],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', Rule::unique('users', 'phone')->ignore($this->user()->id)],
            'whatsapp' => ['required', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->user()->id)],
            'about' => ['nullable', 'string'],
            'avatar' => ['nullable', 'max:2048'],
        ];
    }

//    protected function prepareForValidation(): void
//    {
//        $this->merge([
//            'id' => $this->route('id'),
//        ]);
//    }
}
