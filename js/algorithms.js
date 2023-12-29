sortAlgos = ['Insertion Sort', 'Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort', 'Counting Sort', 'Radix Sort'];
searchAlgos = ['Linear Search', 'Binary Search', 'Breadth First Search', 'Depth First Search']
var heights = [];
var indices = [];
var run = true;
var currAlgo = insertionSort;
var delay = 500;

updateColumns($('#nSlider').val(), false, false);

$('#algoOptions').on('click', 'li', function() {
    $('.activeAlgo').removeClass('activeAlgo');
    $(this).addClass('activeAlgo');

    switch ($(this).text()) {
        case sortAlgos[0]:
            currAlgo = insertionSort;
            break;
        case sortAlgos[1]:
            currAlgo = mergeSort;
            break;
        case sortAlgos[2]:
            currAlgo = quickSort;
            break;
        case sortAlgos[3]:
            currAlgo = bubbleSort;
            break;
        case sortAlgos[4]:
            currAlgo = heapSort;
            break;
        case sortAlgos[5]:
            currAlgo = countingSort;
            break;
        case sortAlgos[6]:
            currAlgo = radixSort;
            break;
        case searchAlgos[0]:
            currAlgo = linearSearch;
            break;
        case searchAlgos[1]:
            currAlgo = binarySearch;
            break;
        case searchAlgos[2]:
            currAlgo = breadthFirstSearch;
            break;
        case searchAlgos[3]:
            currAlgo = depthFirstSearch;
            break;
    }

    updateColumns($("#nSlider").val(), currAlgo == countingSort, currAlgo == radixSort);
});

$('.options p').click(function() {
    $(this).toggleClass('activeOption inactiveOption');
    $('.options p').not(this).toggleClass('activeOption inactiveOption');

    $('#algoOptions').empty();

    if($('.activeOption').text() === 'Sort') {
        currAlgo = insertionSort;
        sortAlgos.forEach(function(algo) {
            $('#algoOptions').append('<li>' + algo + '</li>');
        });
    } else if ($('.activeOption').text() === 'Search') {
        currAlgo = linearSearch;
        searchAlgos.forEach(function(algo) {
            $('#algoOptions').append('<li>' + algo + '</li>');
        });
    }

    $('#algoOptions li:first').addClass('activeAlgo');
});

$('#nSlider').on('input', function() {
    $('#currValue').text($(this).val());
});

$('#nSlider').on('mouseup', function() {
    updateColumns($(this).val(), currAlgo == countingSort, currAlgo == radixSort);
});

$('#speedSlider').on('mouseup', function() {
    delay = 1000 - ($(this).val() - 25);
    $('.column').css({'transition': 'left ' + delay + 'ms ease-in-out'});
});

$('#startButton').on('click', async function() {
    run = true;
    await currAlgo();
});

$('#pauseButton').on('click', async function() {
    run = !run;

    if(run) {
        currAlgo();
        $("#pauseButton").text("Pause");
    } else {
        $("#pauseButton").text("Resume");
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateColumns(numCols, countingFlag, radixFlag) {
    if(currAlgo != countingSort && currAlgo != radixSort && currAlgo != linearSearch && 
        currAlgo != breadthFirstSearch && currAlgo != depthFirstSearch && currAlgo != binarySearch) {
        $('#array').empty();

        heights = [];
        indices = [];

        // if(countingFlag) {

        // } else if(radixFlag) {
        //     for (var i = 0; i < numCols; i++) {
        //         heights.push(i / (numCols - 1) * 90 + 10);
        //         indices.push(i + 101);
        //     }
        // } else {
            for (var i = 0; i < numCols; i++) {
                heights.push(i / (numCols - 1) * 90 + 10);
                indices.push(i + 1);
            }
        // }

        for (var i = heights.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = heights[i];
            heights[i] = heights[j];
            heights[j] = temp;

            temp = indices[i];
            indices[i] = indices[j];
            indices[j] = temp;
        }

        for(var i = 0; i < numCols; i++) {
            $('#array').append('<div class="column" id="col' + i + '"style="height: ' + heights[i] + '%; left: ' + i * 100 / numCols + '%;">' + indices[i] + '</div>');
        }

        $('.column').css('width', (100 / numCols) + "%");
    } else {
        $('#array').append('<div class="column" style="width: 100%; height: 100%;">In Progress</div>');
    }
}

function swapColumns(i, j) {
    $('#col' + i).css('left', j * 100 / $('#array').children().length + '%');
    $('#col' + j).css('left', i * 100 / $('#array').children().length + '%');
    
    $('#col' + i).attr('id', 'temp');
    $('#col' + j).attr('id', 'col' + i);
    $('#temp').attr('id', 'col' + j);
}

function updateHeight(i, height) {
    $('#col' + i).css('height', height + "%");
    $('#col' + i).text(i);
}

async function insertionSort() {
    for (var i = 1; i < heights.length && run; i++) {
        var key = heights[i];
        var j = i - 1;

        while (j >= 0 && heights[j] > key && run) {
            swapColumns(j + 1, j);

            heights[j + 1] = heights[j];
            j--;

            await sleep(delay);
        }

        heights[j + 1] = key;
    }
}

async function mergeSort(start = 0, end = heights.length - 1) {
    if (start < end && run) {
        var middle = Math.floor((start + end) / 2);

        await mergeSort(start, middle);
        await mergeSort(middle + 1, end);

        await merge(start, middle, end);
    }
}

async function merge(start, middle, end) {
    var leftArray = heights.slice(start, middle + 1);
    var rightArray = heights.slice(middle + 1, end + 1);

    var i = 0;
    var j = 0;
    var k = start;

    while (i < leftArray.length && j < rightArray.length && run) {
        if (leftArray[i] <= rightArray[j]) {
            if(heights[k] != leftArray[i]) {
                updateHeight(k, leftArray[i]);
                await sleep(delay);
            }
            heights[k++] = leftArray[i++];
        } else {
            if(heights[k] != rightArray[j]) {
                updateHeight(k, rightArray[j]);
                await sleep(delay);
            }
            heights[k++] = rightArray[j++];
        }        
    }

    while (i < leftArray.length && run) {
        if(heights[k] != leftArray[i]) {
            updateHeight(k, leftArray[i]);
            await sleep(delay);
        }
        heights[k++] = leftArray[i++];
    }

    while (j < rightArray.length && run) {
        if(heights[k] != rightArray[j]) {
            updateHeight(k, rightArray[j]);
            await sleep(delay);
        }
        heights[k++] = rightArray[j++];
    }
}  

async function quickSort(low = 0, high = heights.length - 1) {
    if (low < high && run) {
        var pivotIndex = await partition(low, high);

        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    var pivot = heights[high];
    var i = low - 1;

    for (var j = low; j < high && run; j++) {
        if (heights[j] <= pivot) {
            i++;

            if(i != j) {
                swapColumns(i, j);

                var temp = heights[i];
                heights[i] = heights[j];
                heights[j] = temp;

                await sleep(delay);
            }
        }
    }

    if(run && i + 1 != high) {
        swapColumns(i + 1, high);

        var temp = heights[i + 1];
        heights[i + 1] = heights[high];
        heights[high] = temp;

        await sleep(delay);
    }

    return i + 1;
}

async function bubbleSort() {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < heights.length - 1 && run; i++) {
            if (heights[i] > heights[i + 1]) {
                swapColumns(i, i + 1);

                var temp = heights[i];
                heights[i] = heights[i + 1];
                heights[i + 1] = temp;

                swapped = true;

                await sleep(delay);
            }
        }
    } while (swapped && run);
}

async function heapSort() {
    var n = heights.length;

    for (var i = Math.floor(n / 2) - 1; i >= 0 && run; i--) {
        await heapify(n, i);
    }

    for (var i = n - 1; i > 0 && run; i--) {
        swapColumns(0, i);

        var temp = heights[0];
        heights[0] = heights[i];
        heights[i] = temp;

        await sleep(delay);

        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && heights[left] > heights[largest]) {
        largest = left;
    }

    if (right < n && heights[right] > heights[largest]) {
        largest = right;
    }

    if (largest !== i && run) {
        swapColumns(i, largest);

        var temp = heights[i];
        heights[i] = heights[largest];
        heights[largest] = temp;

        await sleep(delay);

        await heapify(n, largest);
    }
}

async function countingSort() {

}

async function radixSort() {
    var max = indices[0];
    for (let i = 1; i < indices.length; i++) {
        if (indices[i] > max) {
            max = indices[i];
        }
    }

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const output = new Array(indices.length).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < indices.length; i++) {
            count[Math.floor(indices[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            output[count[Math.floor(indices[i] / exp) % 10] - 1] = indices[i];
            count[Math.floor(indices[i] / exp) % 10]--;
        }

        for (let i = 0; i < indices.length; i++) {
            indices[i] = output[i];
            // swapColumns(i, heights[i]); 
            // await sleep(delay);
        }
    }
}

async function linearSearch() {

}

async function binarySearch() {

}

async function breadthFirstSearch() {

}

async function depthFirstSearch() {

}