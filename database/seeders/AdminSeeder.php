<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin Invity',
            'email' => 'admin@invity.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('admin');
        $user->givePermissionTo(Permission::all());
    }
}
