#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Hello Openframe (ExamplePlugin install.sh)"

# Some limited platform detection might be in order... though at present we're targeting the Pi
os=$(uname)
arq=$(uname -m)

if [ $os == "Linux" ]; then

    # on Debian Linux distributions

    # on RaspberryPi
    if [ $arq == "armv7l" ]; then

        # ####
        #
        # FOR NOW, CODE GOES HERE since we're shooting for RPi support
        #
        # ####



    else
        # Non-arm7 Debian...
    fi

elif [ $os == "Darwin" ]; then
    # OSX
fi
