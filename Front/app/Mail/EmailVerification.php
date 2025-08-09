<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user;
    public $newCode;
    public $tries = 5; // Increased retry attempts
    public $timeout = 120; // Increased timeout

    public function __construct($user, $newCode = null)
    {
        $this->user = $user;
        $this->newCode = $newCode;
        Log::info('Email verification constructed for user: ' . $user->email);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS', 'anrivarshanidze2407@gmail.com'),
            subject: 'DCD Verification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        Log::info('Building email content with verification code: ' . ($this->newCode ?? $this->user->verify_code));
        return new Content(
            view: 'mail.email_verification',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        Log::info('Building email for: ' . $this->user->email);

        // Configure additional SMTP settings
        $this->withSwiftMessage(function ($message) {
            $message->getHeaders()->addTextHeader('X-Application', 'DCD System');

            // Get the underlying Swift_Transport
            $transport = $message->getHeaders()->get('X-Transport');
            if ($transport) {
                // Configure timeouts if possible
                if (method_exists($transport, 'setTimeout')) {
                    $transport->setTimeout(120);
                }
            }
        });

        return $this->subject('DCD Verification')
                    ->view('mail.email_verification');
    }
}
