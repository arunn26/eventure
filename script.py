import os

def export_react_code(src_dirs, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for src_dir in src_dirs:
            for root, dirs, files in os.walk(src_dir):
                # Skip node_modules directories
                if 'node_modules' in dirs:
                    dirs.remove('node_modules')
                for file in files:
                    if file.endswith('.js') or file.endswith('.jsx'):
                        file_path = os.path.join(root, file)
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(f"// File: {file_path}\n")
                            outfile.write(infile.read())
                            outfile.write("\n\n")

if __name__ == "__main__":
    src_directories = ['frontend/src', 'backend']  # List of directories to scan
    output_txt_file = 'react_code_export.txt'

    export_react_code(src_directories, output_txt_file)
    print(f"Code exported to {output_txt_file}")
