## Security

This plugin follows the security guidelines and best practices laid out in the official [WordPress Plugin Developer Handbook](https://developer.wordpress.org/plugins/security/).

### 1) Code Standards

A critical part of plugin security is following best practices for whatever language you are in/platform you are writing for. Plugin developers must assume their product will run in a hostile environment and should therefore code defensive limiting potential attack surfaces.

#### WordPress

WordPress provides many built-in functions to properly handle critical operations like writing to the database. These function properly prepare and handle data before so as to limit potential security issues. As a result, these native functions greatly reduce the complexity of the plugin's codebase thereby helping to reducing the chance for mistakes and improving maintainability. In nearly all cases, the native WordPress functions are preferrable to custom solutions and as such should be used whenever possible.

For example they should be chosen over we use the functions provided by WordPress `$wpdb->insert`.

#### PHP

##### A) Command Execution Functions:

This set of functions grants users access to the underlaying operating system shell. There is no valid need to use them in this plugin and they are avoided entirely.

```
exec
passthru
system
shell_exec
\`\` (backticks)
popen
proc_open
pcntl_exec
```

Similarly, there is little need for filesystem functions and they are avoided:

<details>

<summary> See Full List of File System Functions to be Avoided</summary>

```
fopen
tmpfile
bzopen
gzopen
SplFileObject->__construct
chgrp
chmod
chown
copy
file_put_contents
lchgrp
lchown
link
mkdir
move_uploaded_file
rename
rmdir
symlink
tempnam
touch
unlink
imagepng   - 2nd parameter is a path.
imagewbmp  - 2nd parameter is a path.
image2wbmp - 2nd parameter is a path.
imagejpeg  - 2nd parameter is a path.
imagexbm   - 2nd parameter is a path.
imagegif   - 2nd parameter is a path.
imagegd    - 2nd parameter is a path.
imagegd2   - 2nd parameter is a path.
iptcembed
ftp_get
ftp_nb_get
file_exists
file_get_contents
file
fileatime
filectime
filegroup
fileinode
filemtime
fileowner
fileperms
filesize
filetype
glob
is_dir
is_executable
is_file
is_link
is_readable
is_uploaded_file
is_writable
is_writeable
linkinfo
lstat
parse_ini_file
pathinfo
readfile
readlink
realpath
stat
gzfile
readgzfile
getimagesize
imagecreatefromgif
imagecreatefromjpeg
imagecreatefrompng
imagecreatefromwbmp
imagecreatefromxbm
imagecreatefromxpm
ftp_put
ftp_nb_put
exif_read_data
read_exif_data
exif_thumbnail
exif_imagetype
hash_file
hash_hmac_file
hash_update_file
md5_file
sha1_file
highlight_file
show_source
php_strip_whitespace
get_meta_tags
```

</details>

##### B) `eval` & `eval`-like Functions

The `eval` function is dangerous as it allows for the arbitrary execution of code and is therefore never used. Similarly, the following operations which are effectively equivalent to `eval` are never used:

```
assert()
preg_replace with a /e modifier
create_function()
```

Additionally, `include()`, `include_once()`, `require()` and `require_once()` are only run on known files within the plugin's file structure and never on a variable.

Finally, invoking a function in one of the following ways:

```php
$_GET['func_name']($_GET['argument']);
$func = new ReflectionFunction($_GET['func_name']);
$func->invoke();
$func->invokeArgs(array());
```

#### JavaScript

##### A) Dependencies

Any code that you do not control provides an opportunity to inject vulnerabilities.

The plugin's package-lock file is automatically scanned and compared against known CVEs.

### 2) Automated Code Scanning

Dependabot - Dependency scanning package-lock and composer-lock files.

TODO: PHP_CodeSniffer - [WordPress Coding Standards](https://github.com/WordPress/WordPress-Coding-Standards)

### 3) User Inputs

All user-submitted data coming from the plugin is rendered safe by a series of validation and sanitization operations. The only source of data is the custom metabox this plugin inserts into the admin panel for pages and posts. There is no possibility of user input from the public-facing frontend of the site.

#### Client-Side Form Validation

TODO. Free-entry user inputs fields in the admin panel are validated client-side (i.e. in the browser) and do not permit form submission unless the values conform to the required type. This first line of defense prevents users from accidentally or intentionally entering form data that could be harmful if saved to the database.

#### Server-Side Form Validation

Upon first recieving data, the plugin checks that it has been submitted with a valid security nonce. These nonces - set on the server - ensure that any AJAX called recieved by the plugin are rejected if they do not originate from an authorized source.

Furthermore, the permissions of the user submitting the data are checked and if that user does not have sufficient permissions (in this case the `edit_pages` capability) the request is rejected.

Once the request is authenticated but before any data is processed, the validation operations check that required values are set and that they are of expected type. For example, when submitting a parent post ID, the validator check that:

1. this required field is set;
1. it is a numeric value as all post ids are; and
1. that it corresponds with a valid post in the `wp_post` table.

The failure to meet any of these conditions will result in a failure to save and corresponding error message being sent to the user.

#### Input Sanitization

After the user-provided data is validated, it is passed through a type-appropriate sanitization function which ensures it is stripped of potentially harmful values before it is saved to the database.

### 4) Access Rules

Access to the plugin's block data input forms is limited to Editors (specifically, those with the `edit_pages` capability) and only from a page/post admin panel.

The plugin includes a very limited setting page that is accessible only to site administrators ( specifically those with the `activate_plugins` capability or higher).

### 5) Testing

TODO: Automated unit tests help to
