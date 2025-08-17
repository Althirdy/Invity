<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserManagement extends Controller
{
    public function index()
    {
        $users = User::with(['roles', 'permissions'])->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at ? $user->created_at->format('M d, Y') : null,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                        'display_name' => ucfirst(str_replace('_', ' ', $role->name)),
                        'color' => $this->getRoleColor($role->name),
                    ];
                }),
                'permissions' => $user->permissions->pluck('name'),
                'role_count' => $user->roles->count(),
                'permission_count' => $user->permissions->count(),
                'status' => $user->email_verified_at ? 'verified' : 'unverified',
            ];
        });

        return Inertia::render('admin/User-Management/Users', [
            'users' => $users,
        ]);
    }

    private function getRoleColor($roleName)
    {
        return match ($roleName) {
            'admin' => 'bg-blue-100 text-blue-800 border-blue-200',
            'editor' => 'bg-green-100 text-green-800 border-green-200',
            'user' => 'bg-purple-100 text-purple-800 border-purple-200',
            'guest' => 'bg-gray-100 text-gray-800 border-gray-200',
            default => 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
}
