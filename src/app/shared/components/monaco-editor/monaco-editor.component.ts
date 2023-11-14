import { Component, OnInit } from "@angular/core";

@Component({
  selector: "shd-monaco-editor",
  templateUrl: "./monaco-editor.component.html",
  styleUrls: ["./monaco-editor.component.scss"],
})
export class MonacoEditorComponent implements OnInit {
  editorOptions = { theme: "vs-dark", language: "python" };
  code: string = `
  #!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'diagonalDifference' function below.
#
# The function is expected to return an INTEGER.
# The function accepts 2D_INTEGER_ARRAY arr as parameter.
#

def diagonalDifference(arr):
    # Write your code here

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    arr = []

    for _ in range(n):
        arr.append(list(map(int, input().rstrip().split())))

    result = diagonalDifference(arr)

    fptr.write(str(result) + '\n')

    fptr.close()

  `;

  constructor() {}

  ngOnInit(): void {}

  onInit(editor) {
    let line = editor.getPosition();
    console.log(line);
  }
}
