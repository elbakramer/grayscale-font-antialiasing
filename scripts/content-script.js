// Copyright 2024 Yunseong Hwang
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX - License - Identifier: Apache - 2.0

const addOpacityFilterIfNotTransparent = () => {
    const root = document.documentElement;
    const rootStyles = window.getComputedStyle(root);

    const rootOpacity = rootStyles.getPropertyValue("opacity");
    const rootFilter = rootStyles.getPropertyValue("filter");

    const isAppliedAlready = rootFilter.length > 0 && rootFilter.includes("opacity(1)");

    if (isAppliedAlready) {
        console.log("Skip applying grayscale font anti-aliasing:", root);
        return;
    }

    const isTransparentOpacity = rootOpacity.length > 0 && parseFloat(rootOpacity) < 1.0;
    const isTransparentFilter = rootFilter.length > 0 && rootFilter.includes("opacity") && !rootFilter.includes("opacity(1)");
    const isTransparent = isTransparentOpacity || isTransparentFilter;

    if (!isTransparent) {
        root.style.filter += " opacity(1)";
        console.log("Applied grayscale font anti-aliasing:", root);
    }
}

const onInit = () => {
    addOpacityFilterIfNotTransparent(); // first trial
    setTimeout(addOpacityFilterIfNotTransparent, 5000); // try again after 5 seconds to make sure
}

onInit();