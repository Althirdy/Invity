<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissions extends Controller
{
    public function index()
    {
        $roles_d = Role::all();
        $permissions = Permission::all();

        $roles = $roles_d->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'display_name' => ucfirst(str_replace('_', ' ', $role->name)),
                'description' => $this->getRoleDescription($role->name),
                'user_count' => $role->users()->count(),
                'created_at' => $role->created_at ? $role->created_at->format('M d, Y') : null,
                'permissions' => $role->permissions->pluck('name'),
                'permission_count' => $role->permissions()->count(),
                'color' => $this->getRoleColor($role->name),
            ];
        });

        $permissions = $permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'display_name' => ucfirst(str_replace('_', ' ', $permission->name)),
                'description' => $this->getPermissionDescription($permission->name),
                'created_at' => $permission->created_at ? $permission->created_at->format('M d, Y') : null,
                'role_count' => $permission->roles()->count(),
            ];
        });

        return Inertia::render('admin/User-Management/Role-Permission', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    private function getRoleDescription($roleName)
    {
        return match ($roleName) {
            'super_admin' => 'Full system access with all permissions and user management capabilities',
            'admin' => 'Administrative access to manage users, roles, and platform settings',
            'editor' => 'Can create and manage content with limited administrative access',
            'user' => 'Standard user with basic invitation and RSVP management capabilities',
            'guest' => 'Limited access for viewing invitations only',
            default => 'User role with specific permissions'
        };
    }

    private function getRoleColor($roleName)
    {
        return match ($roleName) {
            'super_admin' => 'bg-red-100 text-red-800 border-red-200',
            'admin' => 'bg-blue-100 text-blue-800 border-blue-200',
            'editor' => 'bg-green-100 text-green-800 border-green-200',
            'user' => 'bg-purple-100 text-purple-800 border-purple-200',
            'guest' => 'bg-gray-100 text-gray-800 border-gray-200',
            default => 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }

    private function getPermissionDescription($permissionName)
    {
        return match ($permissionName) {
            'manage_users' => 'Can create, edit, and delete user accounts',
            'manage_roles' => 'Can create, edit, and delete user roles',
            'manage_platform_settings' => 'Can modify system-wide platform settings',
            'view_analytics' => 'Can access analytics and reporting data',
            'create_invitation' => 'Can create new invitation pages',
        'edit_invitation' => 'Can modify existing invitation pages',
            'delete_invitation' => 'Can remove invitation pages',
            'view_invitations' => 'Can view invitation pages',
            'manage_rsvp' => 'Can manage RSVP responses and guest lists',
            'export_rsvp' => 'Can export RSVP data to various formats',
            'access_premium_templates' => 'Can use premium invitation templates',
            default => 'System permission with specific functionality'
        };
    }
}
