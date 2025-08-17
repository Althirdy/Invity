import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Trash2, Edit, Eye, Shield, Settings, Search, Filter, SortAsc, SortDesc, Users as UsersIcon, Mail, Calendar, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users(props: { users: any }) {
    const { users } = props;
    
    // State for filtering and sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

    // Get unique roles for filter dropdown
    const allRoles = useMemo(() => {
        const roles = new Set<string>();
        users.forEach((user: any) => {
            user.roles.forEach((role: any) => roles.add(role.name));
        });
        return Array.from(roles);
    }, [users]);

    // Filtered and sorted users
    const filteredUsers = useMemo(() => {
        let filtered = users.filter((user: any) => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRole = roleFilter === 'all' || 
                               user.roles.some((role: any) => role.name === roleFilter);
            
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            
            return matchesSearch && matchesRole && matchesStatus;
        });

        // Sorting
        filtered.sort((a: any, b: any) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (sortBy === 'created_at' || sortBy === 'updated_at') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [users, searchTerm, roleFilter, statusFilter, sortBy, sortOrder]);

    const toggleUserSelection = (userId: number) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(userId)) {
            newSelected.delete(userId);
        } else {
            newSelected.add(userId);
        }
        setSelectedUsers(newSelected);
    };

    const toggleAllUsers = () => {
        if (selectedUsers.size === filteredUsers.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filteredUsers.map((user: any) => user.id)));
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">User Management</h1>
                        <p className="text-muted-foreground">
                            Manage user accounts, roles, and permissions
                        </p>
                    </div>
                </div>


                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="flex-1 w-full lg:w-auto">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search users by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Role Filter */}
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full lg:w-48">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    {allRoles.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full lg:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="verified">Verified</SelectItem>
                                    <SelectItem value="unverified">Unverified</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full lg:w-48">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="created_at">Created Date</SelectItem>
                                    <SelectItem value="role_count">Role Count</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort Order */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="gap-2"
                            >
                                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                                {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Users ({filteredUsers.length})</CardTitle>
                                <CardDescription>
                                    Showing {filteredUsers.length} of {users.length} users
                                </CardDescription>
                            </div>
                            {selectedUsers.size > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedUsers.size} selected
                                    </span>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                        Edit Selected
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        Delete Selected
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-0">
                            {filteredUsers.map((user: any) => (
                                <div key={user.id} className="border-b last:border-b-0 p-6 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        {/* Checkbox */}
                                        <Checkbox
                                            checked={selectedUsers.has(user.id)}
                                            onCheckedChange={() => toggleUserSelection(user.id)}
                                        />
                                        
                                        {/* User Info */}
                                        <div className="flex-1 flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src="" alt={user.name} />
                                                <AvatarFallback className="text-sm font-medium">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold">{user.name}</h3>
                                                    <Badge 
                                                        variant={user.status === 'verified' ? 'default' : 'secondary'}
                                                        className="gap-1"
                                                    >
                                                        {user.status === 'verified' ? (
                                                            <CheckCircle className="h-3 w-3" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3" />
                                                        )}
                                                        {user.status === 'verified' ? 'Verified' : 'Unverified'}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Joined {user.created_at}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4" />
                                                        <span>{user.role_count} roles</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Roles */}
                                                {user.roles && user.roles.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {user.roles.map((role: any) => (
                                                            <Badge 
                                                                key={role.id}
                                                                variant="outline" 
                                                                className={`text-xs ${role.color}`}
                                                            >
                                                                {role.display_name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Actions */}
                                        {/* <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit className="h-4 w-4" />
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-2 text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                            
                            {filteredUsers.length === 0 && (
                                <div className="p-12 text-center">
                                    <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No users found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
