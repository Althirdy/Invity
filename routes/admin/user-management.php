<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserManagement;
use App\Http\Controllers\Admin\RolePermissions;

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('role-permission', [RolePermissions::class, 'index'])->name('role-permission');
    Route::get('users', [UserManagement::class, 'index'])->name('users');
});
