<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRatingRequest extends FormRequest
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
            'user_to' => ['required', 'integer', 'exists:users,id'],
            'score' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'score.required' => 'გთხოვთ მონიშვნოთ რეიტინგი',
            'score.min' => 'გთხოვთ მონიშვნოთ რეიტინგი',
            'comment.required' => 'გთხოვთ შეავსოთ კომენტარი',
        ];
    }
}
