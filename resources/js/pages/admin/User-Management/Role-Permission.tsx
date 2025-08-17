import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Trash2, Edit, Eye, Shield, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
    },
    {
        title: 'Roles & Permissions',
        href: '/role-permission',
    },
];


export default function RolePermission(props: { roles: any; permissions: any }) {
    const { roles, permissions } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role & Permission" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Tabs for Roles and Permissions */}
                <Tabs defaultValue="roles" className="w-full">
                    <TabsList className="w-1/4">
                        <TabsTrigger value="roles" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Roles ({roles.length})
                        </TabsTrigger>
                        <TabsTrigger value="permissions" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Permissions ({permissions.length})
                        </TabsTrigger>
                    </TabsList>

                    {/* Roles Tab */}
                    <TabsContent value="roles" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Manage Roles</h2>
                                <p className="text-sm text-muted-foreground">
                                    Create and manage user roles and their associated permissions
                                </p>
                            </div>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create Role
                            </Button>
                        </div>

                        {/* Statistics Cards */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-blue-700">Total Roles</p>
                                            <p className="text-2xl font-bold text-blue-900">{roles.length}</p>
                                        </div>
                                        <Shield className="h-8 w-8 text-blue-600" />
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-green-700">Total Users</p>
                                            <p className="text-2xl font-bold text-green-900">
                                                {roles.reduce((sum: number, role: any) => sum + role.user_count, 0)}
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">U</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-purple-700">Total Permissions</p>
                                            <p className="text-2xl font-bold text-purple-900">
                                                {roles.reduce((sum: number, role: any) => sum + role.permission_count, 0)}
                                            </p>
                                        </div>
                                        <Settings className="h-8 w-8 text-purple-600" />
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-orange-700">Active Roles</p>
                                            <p className="text-2xl font-bold text-orange-900">
                                                {roles.filter((role: any) => role.user_count > 0).length}
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">✓</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div> */}

                        <Card>
                            <CardContent className="p-0">
                                <div className="space-y-0">
                                    {roles.map((role: any) => (
                                        <div key={role.id} className="border-b last:border-b-0 p-6 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`text-xs font-medium px-3 py-1 ${role.color}`}
                                                        >
                                                            {role.name}
                                                        </Badge>
                                                        <h3 className="text-lg font-semibold text-foreground">
                                                            {role.display_name}
                                                        </h3>
                                                    </div>
                                                    
                                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                                        {role.description}
                                                    </p>
                                                    
                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            <span className="font-medium">{role.user_count}</span>
                                                            <span>users assigned</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="font-medium">{role.permission_count}</span>
                                                            <span>permissions</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                                            <span>Created {role.created_at}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* <div className="flex items-center gap-2 ml-4">
                                                    <Button variant="outline" size="sm" className="gap-2 hover:bg-blue-50 hover:border-blue-200">
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="gap-2 hover:bg-green-50 hover:border-green-200">
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive hover:bg-red-50 hover:border-red-200">
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </Button>
                                                </div> */}
                                            </div>
                                            
                                            {role.permissions && role.permissions.length > 0 && (
                                                <>
                                                    <Separator className="my-4" />
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-3 text-foreground">Permissions:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {role.permissions.map((permission: string) => (
                                                                <Badge key={permission} variant="outline" className="text-xs bg-muted/50">
                                                                    {permission.replace(/_/g, ' ')}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Permissions Tab */}
                    <TabsContent value="permissions" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">System Permissions</h2>
                                <p className="text-sm text-muted-foreground">
                                    Manage available permissions that can be assigned to roles
                                </p>
                            </div>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Permission
                            </Button>
                        </div>

                        {/* Permissions Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-700">Total Permissions</p>
                                            <p className="text-2xl font-bold text-indigo-900">{permissions?.length || 0}</p>
                                        </div>
                                        <Settings className="h-8 w-8 text-indigo-600" />
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-emerald-700">Assigned Permissions</p>
                                            <p className="text-2xl font-bold text-emerald-900">
                                                {permissions?.filter((p: any) => p.role_count > 0).length || 0}
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">✓</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-rose-700">Unassigned</p>
                                            <p className="text-2xl font-bold text-rose-900">
                                                {permissions?.filter((p: any) => p.role_count === 0).length || 0}
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 bg-rose-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">!</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="space-y-0">
                                    {permissions?.map((permission: any) => (
                                        <div key={permission.id} className="border-b last:border-b-0 p-6 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`text-xs font-medium px-3 py-1 ${
                                                                permission.role_count > 0 
                                                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                                                    : 'bg-gray-100 text-gray-800 border-gray-200'
                                                            }`}
                                                        >
                                                            {permission.role_count > 0 ? 'Assigned' : 'Unassigned'}
                                                        </Badge>
                                                        <h4 className="text-lg font-semibold text-foreground">
                                                            {permission.display_name}
                                                        </h4>
                                                    </div>
                                                    
                                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                                        {permission.description}
                                                    </p>
                                                    
                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            <span className="font-medium">{permission.role_count}</span>
                                                            <span>roles assigned</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                                            <span>Created {permission.created_at}</span>
                                                        </div>
                                                        <code className="text-xs bg-muted px-2 py-1 rounded">
                                                            {permission.name}
                                                        </code>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 ml-4">
                                                    <Button variant="outline" size="sm" className="gap-2 hover:bg-blue-50 hover:border-blue-200">
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="gap-2 hover:bg-green-50 hover:border-green-200">
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
